class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class SulfurasItem extends Item {
  // quality = 80;

  constructor() {
    const quality = 80;
    const sellIn = 100;
    super("Sulfuras, Hand of Ragnaros", sellIn, quality);
  }

  updateSellIn() {
    // Legendary items do not expire
  }

  updateQuality() {
    // Sulfuras quality does not change
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      var currentItem = this.items[i];

      if (currentItem.name === 'Sulfuras, Hand of Ragnaros') {
        currentItem.updateSellIn();
        currentItem.updateQuality();
        continue;
      }

      // Quality never goes above 50
      if (currentItem.quality >= 50 || currentItem.quality === 0) {
          continue;
      }

      if (currentItem.name === 'Aged Brie') {
        currentItem.sellIn = currentItem.sellIn - 1;
        currentItem.quality = currentItem.quality + 1;
        continue;
      }

      if (currentItem.name === 'Backstage passes to a TAFKAL80ETC concert') {
        currentItem.sellIn = currentItem.sellIn - 1;
        currentItem.quality = currentItem.quality + 1;

        if (currentItem.sellIn < 11) {
          currentItem.quality = currentItem.quality + 1;
        }

        if (currentItem.sellIn < 6) {
          currentItem.quality = currentItem.quality + 1;
        }

        if (currentItem.sellIn < 0) {
          currentItem.quality = 0;
        }

        continue;
      }

      if (currentItem.name === "Conjured item") {
        currentItem.sellIn = currentItem.sellIn - 1;

        currentItem.quality = currentItem.quality - 2;

        continue;
      }

      // Normal Items

      // Update Quality
      currentItem.quality = currentItem.quality - 1;

      // Update sellIn
      currentItem.sellIn = currentItem.sellIn - 1;

      // Quality decreases more after the sellIn date
      if (currentItem.sellIn < 0) {
        currentItem.quality = currentItem.quality - 1;
      }
    }

    return this.items;
  }
}
