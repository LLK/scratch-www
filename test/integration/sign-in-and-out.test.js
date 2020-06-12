const SeleniumHelper = require('./selenium-helpers.js');

const {
    clickText,
    findByXpath,
    clickXpath,
    clickButton,
    buildDriver
} = new SeleniumHelper();

let username = process.env.SMOKE_USERNAME;
let password = process.env.SMOKE_PASSWORD;
let remote = process.env.SMOKE_REMOTE || false;
let rootUrl = process.env.ROOT_URL || 'https://scratch.ly';
let scratchr2url = rootUrl + '/users/' + username;
let wwwURL = rootUrl;

if (remote){
    jest.setTimeout(60000);
} else {
    jest.setTimeout(10000);
}

let driver;

describe('www-integration sign-in-and-out', () => {
    beforeAll(async () => {
        driver = await buildDriver('www-integration sign-in-out');
    });

    describe('sign in', () => {
        afterEach(async () => {
            await driver.get(wwwURL);
            await clickXpath('//div[@class="account-nav"]');
            await clickText('Sign out');
        });

        test('sign in on www', async () => {
            await driver.get(wwwURL);
            await driver.sleep(500);
            await clickXpath('//li[@class="link right login-item"]/a');
            let name = await findByXpath('//input[@id="frc-username-1088"]');
            await name.sendKeys(username);
            let word = await findByXpath('//input[@id="frc-password-1088"]');
            await word.sendKeys(password);
            await clickXpath('//button[contains(@class, "button") and ' +
                'contains(@class, "submit-button") and contains(@class, "white")]');
            let element = await findByXpath('//span[contains(@class, "profile-name")]');
            let text = await element.getText();
            await expect(text.toLowerCase()).toEqual(username.toLowerCase());
        });

        test('sign in on scratchr2', async () => {
            await driver.get(scratchr2url);
            await driver.sleep(500);
            await clickXpath('//li[@class="sign-in dropdown"]/span');
            let name = await findByXpath('//input[@id="login_dropdown_username"]');
            await name.sendKeys(username);
            let word = await findByXpath('//input[@name="password"]');
            await word.sendKeys(password);
            await clickButton('Sign in');
            let element = await findByXpath('//span[@class="user-name dropdown-toggle"]');
            let text = await element.getText();
            await expect(text.toLowerCase()).toEqual(username.toLowerCase());
        });
    });

    describe('sign out', () => {
        beforeEach(async () => {
            await driver.get(wwwURL);
            await clickXpath('//li[@class="link right login-item"]');
            let name = await findByXpath('//input[@id="frc-username-1088"]');
            await name.sendKeys(username);
            let word = await findByXpath('//input[@id="frc-password-1088"]');
            await word.sendKeys(password);
            await clickXpath('//button[contains(@class, "button") and ' +
                    'contains(@class, "submit-button") and contains(@class, "white")]');
        });

        test('sign out on www', async () => {
            await clickXpath('//a[contains(@class, "user-info")]');
            await clickText('Sign out');
            let element = await findByXpath('//li[@class="link right login-item"]/a/span');
            let text = await element.getText();
            await expect(text.toLowerCase()).toEqual('Sign In'.toLowerCase());
        });

        test('sign out on scratchr2', async () => {
            await driver.get(scratchr2url);
            await driver.sleep(500);
            await clickXpath('//span[@class="user-name dropdown-toggle"]');
            await clickXpath('//li[@id="logout"]');
            let element = await findByXpath('//li[@class="link right login-item"]/a/span');
            let text = await element.getText();
            await expect(text.toLowerCase()).toEqual('Sign In'.toLowerCase());
        });

    });

    afterAll(async () => {
        await driver.quit();
    });

});
