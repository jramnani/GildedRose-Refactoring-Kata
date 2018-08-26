describe("Gilded Rose", function() {

    it("Normal items should degrade in quality by one over time", function() {
        const gildedRose = new Shop([ new NormalItem("Munster Cheese", 5, 10) ]);

        const items = gildedRose.updateQuality();

        expect(items[0].quality).toEqual(9);
    });

    it("Normal items should degrade in quality by twice as much after the SellIn date", function() {
        const gildedRose = new Shop([ new NormalItem("Munster Cheese", 0, 10) ]);

        const items = gildedRose.updateQuality();

        expect(items[0].quality).toEqual(8);
    });

    it("Normal item quality should not go below zero", function() {
        const gildedRose = new Shop([ new Item("Munster Cheese", 0, 0) ]);

        const items = gildedRose.updateQuality();

        expect(items[0].quality).toEqual(0);
    });

    it("The quality of an item is never below zero", function() {
       const gildedRose = new Shop([
           new Item("Munster Cheese", 0, 0),
           new AgedBrieItem(0, 0),
           new ConjuredItem(0, 0),
           new Item("Backstage passes to a TAFKAL80ETC concert", 0, 0),
           new SulfurasItem(),
       ]);

       const items = gildedRose.updateQuality();

       for (var i=0; i < items.length; i++) {
           expect(items[i].quality).toBeGreaterThan(-1);
       }
    });

    it("The quality of an item is never over 50", function() {
        const gildedRose = new Shop([
            new Item("Munster Cheese", 5, 50),
            new AgedBrieItem(1, 50),
            new Item("Backstage passes to a TAFKAL80ETC concert", 1, 50)
        ]);

        const items = gildedRose.updateQuality();

        for (var i=0; i < items.length; i++) {
            // console.log("DEBUG: item = " + items[i].name + " quality =" + items[i].quality);
            expect(items[i].quality).toBeLessThan(51);
        }
    });

    it("Backstage passes go up in quality 10 days or less before the concert", function() {
        const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 9, 10) ]);

        const items = gildedRose.updateQuality();

        expect(items[0].quality).toEqual(12);
    });

    it("Backstage passes go up in quality 5 days or less before the concert", function() {
        const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10) ]);

        const items = gildedRose.updateQuality();

        expect(items[0].quality).toEqual(13);
    });

    it("Backstage passes go down in quality to zero after the concert", function() {
        const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10) ]);

        const items = gildedRose.updateQuality();

        expect(items[0].quality).toEqual(0);
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

    it("Shop can handle a SulfurasItem", function () {
        const gildedRose = new Shop([ new SulfurasItem() ]);

        const items = gildedRose.updateQuality();

        expect(items[0].quality).toEqual(80);
    });

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

    it("Conjured items decrease in quality twice as fast as Normal items", function () {
        const item = new ConjuredItem(5, 10);

        item.updateSellIn();
        item.updateQuality();

        expect(item.quality).toEqual(8);
    });

    it("Shop can handle ConjuredItems", function () {
        const gildedRose = new Shop([ new ConjuredItem(5, 10)]);

        const items = gildedRose.updateQuality();

        expect(items[0].quality).toEqual(8)
    });

    it("Aged Brie quality increases over time", function () {
        const item = new AgedBrieItem(5, 10);

        item.updateSellIn();
        item.updateQuality();

        expect(item.quality).toBe(11);
    });

    it("Shop can handle Aged Brie", function () {
        const gildedRose = new Shop([ new AgedBrieItem(5, 10) ]);

        const items = gildedRose.updateQuality();

        expect(items[0].quality).toEqual(11);
    });
});
