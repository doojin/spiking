const puppeteer = require('puppeteer');
const { JSDOM } = require('jsdom');

const extract = async (url, extractor) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);

    const currentUrl = page.url();
    const html = await page.content();
    
    extractData(currentUrl, html, extractor);
}

const extractData = (url, content, extractor) => {
    const document = new JSDOM(content, { url }).window.document;
    extractor(document);
}

extract('http://google.com', (document) => {
    const divCount = document.querySelectorAll('div').length;
    console.log(divCount);
});