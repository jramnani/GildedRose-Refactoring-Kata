class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      var currentItem = this.items[i];

        // Sulfuras quality or sellIn doesn't change
      if (currentItem.name == 'Sulfuras, Hand of Ragnaros') {
        continue;
      }

      // Quality never goes above 50
      if (currentItem.quality >= 50) {
          continue;
      }

      // Update Quality
      if (currentItem.name != 'Aged Brie' && currentItem.name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (currentItem.quality > 0) {
            currentItem.quality = currentItem.quality - 1;
            if(currentItem.name == "Conjured item") {
              currentItem.quality = currentItem.quality - 1;
            }
          } 
      } else {
          currentItem.quality = currentItem.quality + 1;
          if (currentItem.name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (currentItem.sellIn < 11) {
              if (currentItem.quality < 50) {
                currentItem.quality = currentItem.quality + 1;
              }
            }
            if (currentItem.sellIn < 6) {
                currentItem.quality = currentItem.quality + 1;
            }
          }
      }

      // Update sellIn
      currentItem.sellIn = currentItem.sellIn - 1;

      // Quality decreases more after the sellIn date
      if (currentItem.sellIn < 0) {
        if (currentItem.name != 'Aged Brie') {
          if (currentItem.name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (currentItem.quality > 0) {
                currentItem.quality = currentItem.quality - 1;
            }
          } else {
            currentItem.quality = currentItem.quality - currentItem.quality;
          }
        } else {
            currentItem.quality = currentItem.quality + 1;
        }
      }
    }

    return this.items;
  }
}
