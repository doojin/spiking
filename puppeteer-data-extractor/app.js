const puppeteer = require('puppeteer');

async function run() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://irc.lv');
    console.log('connected');
    const data = await page.evaluate(() => {
        return document.querySelector('html').outerHTML;
    });

    console.log(data);
}

run();