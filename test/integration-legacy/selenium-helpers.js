const webdriver = require('selenium-webdriver');
const bindAll = require('lodash.bindall');
require('chromedriver');

const headless = process.env.SMOKE_HEADLESS || false;
const remote = process.env.SMOKE_REMOTE || false;
const ci = process.env.CI || false;
const buildID = process.env.TRAVIS_BUILD_NUMBER;
const {SAUCE_USERNAME, SAUCE_ACCESS_KEY} = process.env;
const {By, Key, until} = webdriver;

const DEFAULT_TIMEOUT_MILLISECONDS = 20 * 1000;

class SeleniumHelper {
    constructor () {
        bindAll(this, [
            'buildDriver',
            'clickButton',
            'clickCss',
            'clickText',
            'clickXpath',
            'dragFromXpathToXpath',
            'findByCss',
            'findByXpath',
            'findText',
            'getKey',
            'getDriver',
            'getLogs',
            'getSauceDriver',
            'urlMatches',
            'waitUntilGone'
        ]);
    }
    buildDriver (name) {
        if (remote === 'true'){
            let nameToUse;
            if (ci === 'true'){
                nameToUse = 'travis ' + buildID + ' : ' + name;
            } else {
                nameToUse = name;
            }
            this.driver = this.getSauceDriver(SAUCE_USERNAME, SAUCE_ACCESS_KEY, nameToUse);
        } else {
            this.driver = this.getDriver();
        }
        return this.driver;
    }

    getDriver () {
        const chromeCapabilities = webdriver.Capabilities.chrome();
        let args = [];
        if (headless) {
            args.push('--headless');
            args.push('window-size=1024,1680');
            args.push('--no-sandbox');
        }
        chromeCapabilities.set('chromeOptions', {args});
        let driver = new webdriver.Builder()
            .forBrowser('chrome')
            .withCapabilities(chromeCapabilities)
            .build();
        return driver;
    }

    getSauceDriver (username, accessKey, name) {
        // Driver configs can be generated with the Sauce Platform Configurator
        // https://wiki.saucelabs.com/display/DOCS/Platform+Configurator
        let driverConfig = {
            browserName: 'chrome',
            platform: 'macOS 10.15',
            version: '83.0'
        };
        var driver = new webdriver.Builder()
            .withCapabilities({
                browserName: driverConfig.browserName,
                platform: driverConfig.platform,
                version: driverConfig.version,
                username: username,
                accessKey: accessKey,
                name: name
            })
            .usingServer(`http://${username}:${accessKey
            }@ondemand.saucelabs.com:80/wd/hub`)
            .build();
        return driver;
    }

    getKey (keyName) {
        return Key[keyName];
    }

    findByXpath (xpath, timeoutMessage = `findByXpath timed out for path: ${xpath}`) {
        return this.driver.wait(until.elementLocated(By.xpath(xpath)), DEFAULT_TIMEOUT_MILLISECONDS, timeoutMessage)
            .then(el => (
                this.driver.wait(el.isDisplayed(), DEFAULT_TIMEOUT_MILLISECONDS, `${xpath} is not visible`)
                    .then(() => el)
            ));
    }

    waitUntilGone (element) {
        return this.driver.wait(until.stalenessOf(element));
    }

    clickXpath (xpath) {
        return this.findByXpath(xpath).then(el => el.click());
    }

    clickText (text) {
        return this.clickXpath(`//*[contains(text(), '${text}')]`);
    }

    findText (text) {
        return this.driver.wait(until.elementLocated(By.xpath(`//*[contains(text(), '${text}')]`), 5 * 1000));
    }

    clickButton (text) {
        return this.clickXpath(`//button[contains(text(), '${text}')]`);
    }

    findByCss (css) {
        return this.driver.wait(until.elementLocated(By.css(css), 1000 * 5));
    }

    clickCss (css) {
        return this.findByCss(css).then(el => el.click());
    }

    dragFromXpathToXpath (startXpath, endXpath) {
        return this.findByXpath(startXpath).then(startEl => {
            return this.findByXpath(endXpath).then(endEl => {
                return this.driver.actions()
                    .dragAndDrop(startEl, endEl)
                    .perform();
            });
        });
    }

    urlMatches (regex) {
        return this.driver.wait(until.urlMatches(regex), 1000 * 5);
    }

    getLogs (whitelist) {
        return this.driver.manage()
            .logs()
            .get('browser')
            .then((entries) => {
                return entries.filter((entry) => {
                    const message = entry.message;
                    for (let i = 0; i < whitelist.length; i++) {
                        if (message.indexOf(whitelist[i]) !== -1) {
                            // eslint-disable-next-line no-console
                            // console.warn('Ignoring whitelisted error: ' + whitelist[i]);
                            return false;
                        } else if (entry.level !== 'SEVERE') {
                            // eslint-disable-next-line no-console
                            // console.warn('Ignoring non-SEVERE entry: ' + message);
                            return false;
                        }
                        return true;
                    }
                    return true;
                });
            });
    }

}

module.exports = SeleniumHelper;
