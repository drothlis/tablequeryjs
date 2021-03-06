var casper = require('casper').create({
    clientScripts: ["lib/jquery/jquery.js"]
});
var x = require('casper').selectXPath;

casper.start('./test/events/index.html', function() {
    casper.waitForSelector('#table_search_text', undefined, undefined, 2000);
});

casper.then(function() {
    this.test.assertExists("#table_search_text");
    this.test.assertNotVisible('#trigger1', "trigger1 not visible");
    this.test.assertNotVisible('#trigger2', "trigger2 not visible");
    this.evaluate(function() {
        $("#table_search_text").val("number = 1")
                               .click()
                               .blur();
    });
    this.wait(1000, function() {
        this.capture('test/events/events.png', undefined);
        this.test.assertVisible("#trigger1", "trigger1 visible");
        this.test.assertVisible("#trigger2", "trigger2 visible");
    });
});

casper.run(function() {
    this.test.renderResults(true);
    this.test.done();
});
