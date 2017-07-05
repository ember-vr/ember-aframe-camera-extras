'use strict';

const expect = require('chai').expect;
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
// const firefox = require('selenium-webdriver/firefox');
const chromedriver = require('chromedriver');
// const geckodriver = require('geckodriver');
const path = require('path');
const spawn = require('child_process').spawn;
const { URL } = require('url');

const { until } = webdriver;
const localhost = 'http://127.0.0.1:8080';
const timeout = 10000;

process.env.PATH += path.delimiter + path.dirname(chromedriver.path);
// process.env.PATH += path.delimiter + path.dirname(geckodriver.path);

describe('Acceptance | Application', function() {
  this.timeout(timeout);
  this.retries(5);

  let server;
  let chromeOptions;
  // let firefoxOptions;
  let driver;

  function init(url) {
    driver.get(url);

    driver.wait(until.elementLocated({ tagName: 'a-camera' }));

    driver.executeAsyncScript(callback => {
      let component = new Date().getTime().toString();
      AFRAME.registerComponent(component, {
        init() {
          delete AFRAME.components[component];
          callback();
        }
      });
      document.querySelector('a-camera').setAttribute(component, '');
    });
  }

  before(function(done) {
    server = spawn('node', [
      'node_modules/http-server/bin/http-server',
      'dist'
    ]);

    server.stdout.on('data', data => {
      if (data.toString().includes(localhost)) {
        done();
      }
    });

    chromeOptions = new chrome.Options().addArguments(['incognito']);

    // let firefoxProfile = new firefox.Profile();
    // firefoxProfile.setPreference('browser.privatebrowsing.autostart', true);
    // firefoxOptions = new firefox.Options().setProfile(firefoxProfile);
  });

  beforeEach(function() {
    driver = new webdriver.Builder()
      .forBrowser('chrome')
      .setChromeOptions(chromeOptions)
      .build();
    // driver = new webdriver.Builder()
    //   .forBrowser('firefox')
    //   .setFirefoxOptions(firefoxOptions)
    //   .build();

    // driver.manage().window().setSize(500, 500);
    driver.manage().timeouts().setScriptTimeout(timeout);
  });

  after(function(done) {
    server.on('exit', () => {
      server = null;
      done();
    });
    server.kill('SIGINT');
  });

  describe('starting without query params', function() {
    beforeEach(function() {
      init(localhost);
    });

    it('doesn\'t add query params when no input', function() {
      driver.getCurrentUrl().then(url => {
        expect(new URL(url).search).to.equal('');
      });

      return driver.quit();
    });

    it('updates rotation', function() {
      // either chromedriver misses inputs
      // or selenium operates too quickly to register a change
      // so keep trying until it works
      (function test() {
        driver.actions().
          mouseMove({ x: 1, y: 1 }).
          mouseDown().
          mouseMove({ x: 10, y: 10 }).
          mouseUp().
          perform();

        driver.wait(until.urlContains('rx='), 10).catch(test);
        driver.wait(until.urlContains('ry='), 10).catch(test);
      })();

      driver.getCurrentUrl().then(url => {
        let { searchParams } = new URL(url);
        expect(searchParams.get('rz')).to.be.null;
        expect(searchParams.get('px')).to.be.null;
        expect(searchParams.get('py')).to.be.null;
        expect(searchParams.get('pz')).to.be.null;
      });

      return driver.quit();
    });

    it('updates position', function() {
      // either chromedriver misses inputs sometimes
      // or selenium operates too quickly to register a change
      // so keep trying until it works
      (function test() {
        driver.actions().
          sendKeys(['a', 's']).
          perform();

        driver.wait(until.urlContains('px='), 10).catch(test);
        driver.wait(until.urlContains('pz='), 10).catch(test);
      })();

      driver.getCurrentUrl().then(url => {
        let { searchParams } = new URL(url);
        expect(searchParams.get('rx')).to.be.null;
        expect(searchParams.get('ry')).to.be.null;
        expect(searchParams.get('rz')).to.be.null;
        expect(searchParams.get('py')).to.be.null;
      });

      return driver.quit();
    });
  });

  describe('starting with query params', function() {
    beforeEach(function() {
      init(`${localhost}?rx=1&ry=1&px=1&pz=1`);
    });

    it('', function() {

    });
  });
});
