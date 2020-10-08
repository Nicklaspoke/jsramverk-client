const test = require('selenium-webdriver/testing');
const webdriver = require('selenium-webdriver');
const chai = require('chai');
const { elementIsVisible } = require('selenium-webdriver/lib/until');

chai.should();

const By = webdriver.By;
const until = webdriver.until;
let browser;

function goToNavLink(target) {
    browser.findElement(By.linkText(target)).then(function (element) {
        element.click();
    });
}

function inputIntoInput(id, value) {
    browser.findElement(By.id(id)).then(function (element) {
        element.click();
        element.sendKeys(value);
    });
}

function assertElementValue(id, value) {
    browser
        .findElement(By.id(id))
        .getAttribute('value')
        .then(function (text) {
            text.should.be.equal(value);
        });
}

test.describe('Function Tests', function () {
    test.beforeEach(function (done) {
        this.timeout(20000);
        browser = new webdriver.Builder()
            .withCapabilities(webdriver.Capabilities.firefox())
            .build();
        browser.get('http://localhost:3000/');

        done();
    });

    test.afterEach(function (done) {
        browser.quit();
        done();
    });

    test.it('Test Login Function', function (done) {
        browser.getTitle().then(function (title) {
            title.should.be.equal('JSRamverk Me-Page');
        });

        goToNavLink('Log In');

        browser.wait(until.elementIsVisible(browser.findElement(By.id('login_email'))), 10000);

        browser.getCurrentUrl().then(function (url) {
            url.endsWith('/auth/login').should.be.true;
        });

        inputIntoInput('login_email', 'admin@admin.se');
        inputIntoInput('login_password', 'admin');

        browser.findElement(By.className('login-form-button')).then(function (element) {
            element.click();
        });

        browser.wait(until.urlIs('http://localhost:3000/'), 1000);
        browser.wait(
            until.elementIsVisible(browser.findElement(By.className('ant-layout-content'))),
            1000,
        );

        browser.getCurrentUrl().then(function (url) {
            url.endsWith('/').should.be.true;
        });

        browser
            .findElement(
                By.css('#root > div > section > section > section > div > main > div > h1'),
            )
            .then(function (element) {
                element.getText().then(function (text) {
                    text.should.be.equal('Well hello there fellow traveller of the internet');
                });
            });
        done();
    });

    //Test going to and viewing a report page
    test.it('Go to a report page', function (done) {
        browser
            .findElement(
                By.css(
                    '#root > div > section > section > aside > div > ul > li.ant-menu-submenu.ant-menu-submenu-inline > div',
                ),
            )
            .then(function (element) {
                element.click();
            });
        goToNavLink('kmom03');

        browser.wait(until.urlIs('http://localhost:3000/reports/week/3'), 1000);
        browser.wait(
            until.elementIsVisible(
                browser.findElement(
                    By.css('#root > div > section > section > section > div > main > h1'),
                ),
            ),
            1000,
        );

        //Should have the correct H1 set
        browser
            .findElement(By.css('#root > div > section > section > section > div > main > h1'))
            .then(function (element) {
                element.getText().then(function (text) {
                    text.should.be.equal('Kmom03');
                });
            });

        //Should have the correct URL in the navbar
        browser.getCurrentUrl().then(function (url) {
            url.endsWith('/reports/week/3').should.be.true;
        });

        done();
    });

    test.it('Go to and fill out registration form', function (done) {
        goToNavLink('Register New Account');

        // browser.wait(until.urlIs('http://localhost:3000/auth/register'), 10000)
        browser.wait(until.elementIsVisible(browser.findElement(By.id('register_email'))), 10000);
        inputIntoInput('register_email', 'test@testson.se');
        inputIntoInput('register_confirm-email', 'test@testson.se');
        inputIntoInput('register_password', 'qwerty12345');
        inputIntoInput('register_confirm-password', 'qwerty12345');

        assertElementValue('register_email', 'test@testson.se');
        assertElementValue('register_confirm-email', 'test@testson.se');
        assertElementValue('register_password', 'qwerty12345');
        assertElementValue('register_confirm-password', 'qwerty12345');

        done();
    });
});
