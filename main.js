
const CrawlZalo = require('./libs/CrawlZalo');

const run = async () => {
    try {
        var crawlZalo = new CrawlZalo();

        await crawlZalo.openBrowser();

        await crawlZalo.sendZalo()

    } catch (error) {
        console.log(error);
    }
};

run();

