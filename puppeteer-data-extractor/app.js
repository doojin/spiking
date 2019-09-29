const puppeteer = require('puppeteer');

async function extract(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);

    const html = await page.content();

    console.log(html);
}

extract('https://irc.lv');