/*
 * Checks that the links in the footer on the homepage have the right URLs to redirect to
 *
 * Test cases: https://github.com/LLK/scratch-www/wiki/Most-Important-Workflows
 */

const SeleniumHelper = require('../selenium-helpers.js');
const helper = new SeleniumHelper();

const tap = require('tap');

const webdriver = require('selenium-webdriver');
const driver = helper.buildDriver('www-smoke test_footer_links');

const rootUrl = process.env.ROOT_URL || 'https://scratch.ly';

// timeout for each test; timeout for suite set at command line level
const options = {timeout: 30000};

// number of tests in the plan
tap.plan(24);

tap.tearDown(function () {
    // quit the instance of the browser
    driver.quit();
});

tap.beforeEach(function () {
    // load the page with the driver
    return driver.get(rootUrl);
});

// Function clicks the link and returns the url of the resulting page

const clickFooterLinks = function (linkText) {
    return driver.wait(webdriver.until.elementLocated(webdriver.By.id('footer')))
        .then(function (element) {
            return element.findElement(webdriver.By.linkText(linkText));
        })
        .then(function (element) {
            return element.click();
        })
        .then(function () {
            return driver.getCurrentUrl();
        });
};

// ==== ABOUT SCRATCH column ====

// ABOUT SCRATCH
tap.test('clickAboutScratchLink', options, t => {
    const linkText = 'About Scratch';
    const expectedHref = '/about';
    clickFooterLinks(linkText).then(url => {
        // the href should be at the end of the URL
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// FOR PARENTS
tap.test('clickForParentsLink', options, t => {
    const linkText = 'For Parents';
    const expectedHref = '/parents/';
    clickFooterLinks(linkText).then(url => {
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// FOR EDUCATORS
tap.test('clickForEducatorsLink', options, t => {
    const linkText = 'For Educators';
    const expectedHref = '/educators';
    clickFooterLinks(linkText).then(url => {
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// FOR DEVELOPERS
tap.test('clickForDevelopersScratchLink', options, t => {
    const linkText = 'For Developers';
    const expectedHref = '/developers';
    clickFooterLinks(linkText).then(url => {
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// CREDITS
tap.test('clickCreditsLink', options, t => {
    const linkText = 'Credits';
    const expectedHref = '/credits';
    clickFooterLinks(linkText).then(url => {
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// JOBS
tap.test('clickJobsLink', options, t => {
    const linkText = 'Jobs';
    const expectedUrl = 'https://www.scratchfoundation.org/opportunities/';
    clickFooterLinks(linkText).then(url => {
        t.equal(url, expectedUrl);
        t.end();
    });
});

// PRESS
tap.test('clickPressLink', options, t => {
    const linkText = 'Press';
    const expectedUrl = 'https://www.scratchfoundation.org/media-kit/';
    clickFooterLinks(linkText).then(url => {
        t.equal(url, expectedUrl);
        t.end();
    });
});

// ==== COMMUNITY column ====

// COMMUNITY GUIDELINES
tap.test('clickCommunityGuidelinesLink', options, t => {
    const linkText = 'Community Guidelines';
    const expectedHref = '/community_guidelines';
    clickFooterLinks(linkText).then(url => {
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// DISCUSSION FORUMS
tap.test('clickDiscussionForumsLink', options, t => {
    const linkText = 'Discussion Forums';
    const expectedHref = '/discuss/';
    clickFooterLinks(linkText).then(url => {
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// SCRATCH WIKI test has been removed.

// STATISTICS
tap.test('clickStatisticsLink', options, t => {
    const linkText = 'Statistics';
    const expectedHref = '/statistics/';
    clickFooterLinks(linkText).then(url => {
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// ==== SUPPORT column ====

// IDEAS PAGE
tap.test('clickIdeasPageLink', options, t => {
    const linkText = 'Ideas';
    const expectedHref = '/ideas';
    clickFooterLinks(linkText).then(url => {
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// FAQ
tap.test('clickFAQLink', options, t => {
    const linkText = 'FAQ';
    const expectedHref = '/info/faq';
    clickFooterLinks(linkText).then(url => {
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// OFFLINE EDITOR
tap.test('clickOfflineEditorLink', options, t => {
    const linkText = 'Offline Editor';
    const expectedHref = '/download';
    clickFooterLinks(linkText).then(url => {
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// CONTACT US
tap.test('clickContactUsLink', options, t => {
    const linkText = 'Contact Us';
    const expectedHref = '/contact-us/';
    clickFooterLinks(linkText).then(url => {
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// skip this test since it points to an external site
// SCRATCH STORE
tap.test('clickScratchStoreLink', {skip: true}, t => {
    const linkText = 'Scratch Store';
    const expectedUrl = 'https://scratch-foundation.myshopify.com/';
    clickFooterLinks(linkText).then(url => {
        t.equal(url, expectedUrl);
        t.end();
    });
});

// skip this test since it points to an external site
// DONATE
tap.test('clickDonateLink', {skip: true}, t => {
    const linkText = 'Donate';
    const expectedUrl = 'https://secure.donationpay.org/scratchfoundation/';
    clickFooterLinks(linkText).then(url => {
        t.equal(url, expectedUrl);
        t.end();
    });
});

// ==== LEGAL column ====

// TERMS OF USE
tap.test('clickTermsOfUseLink', options, t => {
    const linkText = 'Terms of Use';
    const expectedHref = '/terms_of_use';
    clickFooterLinks(linkText).then(url => {
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// PRIVACY POLICY
tap.test('clickPrivacyPolicyLink', options, t => {
    const linkText = 'Privacy Policy';
    const expectedHref = '/privacy_policy';
    clickFooterLinks(linkText).then(url => {
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// DMCA
tap.test('clickDMCALink', options, t => {
    const linkText = 'DMCA';
    const expectedHref = '/DMCA';
    clickFooterLinks(linkText).then(url => {
        t.equal(url.substr(-expectedHref.length), expectedHref);
        t.end();
    });
});

// ==== SCRATCH FAMILY column ====

// skip this test since it points to an external site
// SCRATCH ED (SCRATCHED)
tap.test('clickScratchEdLink', {skip: true}, t => {
    const linkText = 'ScratchEd';
    const expectedUrl = 'http://scratched.gse.harvard.edu/';
    clickFooterLinks(linkText).then(url => {
        t.equal(url, expectedUrl);
        t.end();
    });
});

// skip this test since it points to an external site
// SCRATCH JR (SCRATCHJR)
tap.test('clickScratchJrLink', {skip: true}, t => {
    const linkText = 'ScratchJr';
    const expectedUrl = 'https://www.scratchjr.org/';
    clickFooterLinks(linkText).then(url => {
        t.equal(url, expectedUrl);
        t.end();
    });
});

// skip this test since it points to an external site
// SCRATCH DAY
tap.test('clickScratchDayLink', {skip: true}, t => {
    const linkText = 'Scratch Day';
    const expectedUrl = 'https://day.scratch.mit.edu/';
    clickFooterLinks(linkText).then(url => {
        t.equal(url, expectedUrl);
        t.end();
    });
});

// SCRATCH CONFERENCE
tap.test('clickScratchConferenceLink', options, t => {
    const linkText = 'Scratch Conference';
    const expectedHref = '/conference/2020';
    clickFooterLinks(linkText).then(url => {
        t.match(url.substr(-(expectedHref.length + 2)), expectedHref);
        t.end();
    });
});

// skip this test since it points to an external site
// SCRATCH FOUNDATION
tap.test('clickScratchFoundationLink', {skip: true}, t => {
    const linkText = 'Scratch Foundation';
    const expectedUrl = 'https://www.scratchfoundation.org/';
    clickFooterLinks(linkText).then(url => {
        t.equal(url, expectedUrl);
        t.end();
    });
});
