class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class NormalItem extends Item {
  updateSellIn() {
    this.sellIn -= 1;
  }

  updateQuality() {
    this.quality -= 1;

    // Quality decreases more after the sellIn date
    if (this.sellIn < 0) {
      this.quality -= 1;
    }
  }
}

// Special cases

class AgedBrieItem extends Item {
  constructor(sellIn, quality) {
    super("Aged Brie", sellIn, quality);
  }

  updateSellIn() {
    this.sellIn -= 1;
  }

  updateQuality() {
    this.quality += 1;
  }
}

class BackstagePassItem extends Item {

  constructor(sellIn, quality) {
    super("Backstage passes to a TAFKAL80ETC concert", sellIn, quality);
  }

  updateSellIn() {
    this.sellIn -= 1;
  }

  updateQuality() {
    if (this.sellIn < 0) {
      this.quality = 0;
      return;
    }

    this.quality += 1;

    if (this.sellIn <= 10) {
      this.quality += 1;
    }

    if (this.sellIn <= 5) {
      this.quality += 1;
    }
  }
}

class ConjuredItem extends Item {
  constructor(sellIn, quality) {
    super("Conjured item", sellIn, quality);
  }

  updateSellIn() {
    this.sellIn -= 1;
  }

  updateQuality() {
    this.quality -= 2;
  }

}

class SulfurasItem extends Item {
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

      // Quality never goes above 50 or below 0
      if (currentItem.quality >= 50 || currentItem.quality === 0) {
          continue;
      }

      currentItem.updateSellIn();
      currentItem.updateQuality();
    }

    return this.items;
  }
}
