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

});
