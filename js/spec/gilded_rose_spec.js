describe("Gilded Rose", function() {

    it("Normal items should decrease in quality by one each day", function () {
        const item = new NormalItem("Munster Cheese", 5, 10);

        item.updateSellIn();
        item.updateQuality();

        expect(item.sellIn).toEqual(4);
        expect(item.quality).toEqual(9);
    });

    it("Normal items should decrease in quality twice as much after the sellIn date", function () {
        const item = new NormalItem("Munster Cheese", 0, 10);

        item.updateSellIn();
        item.updateQuality();

        expect(item.sellIn).toEqual(-1);
        expect(item.quality).toEqual(8);
    });

    it("The quality of an item is never below zero", function() {
       const gildedRose = new Shop([
           new Item("Munster Cheese", 0, 0),
           new AgedBrieItem(0, 0),
           new ConjuredItem(0, 0),
           new BackstagePassItem(0, 0),
           new SulfurasItem(),
       ]);

       const items = gildedRose.updateQuality();

       for (var i=0; i < items.length; i++) {
           expect(items[i].quality).toBeGreaterThan(-1);
       }
    });

    it("The quality of an item is never over 50 (except Sulfuras)", function() {
        const gildedRose = new Shop([
            new Item("Munster Cheese", 5, 50),
            new AgedBrieItem(1, 50),
            new BackstagePassItem(1, 50),
            new ConjuredItem(1, 50),
        ]);

        const items = gildedRose.updateQuality();

        for (var i=0; i < items.length; i++) {
            // console.log("DEBUG: item = " + items[i].name + " quality =" + items[i].quality);
            expect(items[i].quality).toBeLessThan(51);
        }
    });

    it("Aged Brie quality increases over time", function () {
        const item = new AgedBrieItem(5, 10);

        item.updateSellIn();
        item.updateQuality();

        expect(item.quality).toBe(11);
    });

    it("Backstage passes quality increases over time", function () {
        const item = new BackstagePassItem(20, 10);

        item.updateSellIn();
        item.updateQuality();

        expect(item.quality).toEqual(11);
    });

    it("Backstage passes 10 days before the concert", function () {
        const item = new BackstagePassItem(10, 10);

        item.updateSellIn();
        item.updateQuality();

        expect(item.quality).toEqual(12);
    });

    it("Backstage passes 5 days before the concert", function () {
        const item = new BackstagePassItem(5, 10);

        item.updateSellIn();
        item.updateQuality();

        expect(item.quality).toEqual(13);
    });

    it("Backstage passes quality is zero after the concert", function () {
        const item = new BackstagePassItem(0, 10);

        item.updateSellIn();
        item.updateQuality();

        expect(item.quality).toEqual(0);
    });

    it("Conjured items decrease in quality twice as fast as Normal items", function () {
        const item = new ConjuredItem(5, 10);

        item.updateSellIn();
        item.updateQuality();

        expect(item.quality).toEqual(8);
    });

    it("SulfurasItem should not change in quality", function () {
        const item = new SulfurasItem();

        item.updateSellIn();
        item.updateQuality();

        expect(item.quality).toEqual(80);
    });

    it("SulfurasItem never ages", function () {
        const item = new SulfurasItem();
        const sellInBefore = item.sellIn;

        item.updateSellIn();
        item.updateQuality();

        const sellInAfter = item.sellIn;

        expect(sellInBefore).toEqual(sellInAfter);
    });
});
