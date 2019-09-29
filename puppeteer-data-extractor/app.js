const puppeteer = require('puppeteer');
const { JSDOM } = require('jsdom');
const vm = require('vm');

const extract = async (url, extractor) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);

    const currentUrl = page.url();
    const html = await page.content();

    extractData(currentUrl, html, extractor);
}

const extractData = (url, content, extractorScript) => {
    const document = new JSDOM(content, { url }).window.document;

    const results = [];
    const addResult = result => results.push(result);

    const sandbox = { document, addResult };
    vm.createContext(sandbox);
    vm.runInContext(extractorScript, sandbox);

    console.log(results);
}

extract('http://google.com', 'addResult(document.querySelectorAll("div").length)');