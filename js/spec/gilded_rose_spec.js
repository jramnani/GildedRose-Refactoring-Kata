describe("Gilded Rose", function() {

    it("Normal items should degrade in quality by one over time", function() {
        const gildedRose = new Shop([ new Item("Munster Cheese", 5, 10) ]);

        const items = gildedRose.updateQuality();

        expect(items[0].quality).toEqual(9);
    });

    it("Normal items should degrade in quality by twice as much after the SellIn date", function() {
        const gildedRose = new Shop([ new Item("Munster Cheese", 0, 10) ]);

        const items = gildedRose.updateQuality();

        expect(items[0].quality).toEqual(8);
    });

    it("Normal item quality should not go below zero", function() {
        const gildedRose = new Shop([ new Item("Munster Cheese", 0, 0) ]);

        const items = gildedRose.updateQuality();

        expect(items[0].quality).toEqual(0);
    });

    it("Aged Brie should go up in quality", function() {
        const gildedRose = new Shop([ new Item("Aged Brie", 5, 10) ]);

        const items = gildedRose.updateQuality();

        expect(items[0].quality).toEqual(11);
    });

    it("Sulfuras should stay the same", function() {
        const gildedRose = new Shop([ new Item("Sulfuras, Hand of Ragnaros", 5, 10) ]);

        const items = gildedRose.updateQuality();

        expect(items[0].quality).toEqual(10);
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

    it("Conjured item loses quality twice as fast as normal items", function() {
        const gildedRose = new Shop([ new Item("Conjured item", 5, 10) ]);

        const items = gildedRose.updateQuality();

        expect(items[0].quality).toEqual(8);
    });

});
