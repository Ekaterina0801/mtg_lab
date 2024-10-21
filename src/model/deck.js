class Deck {

    constructor() {
        this.deck1 = new Map();
        this.size = 0;
    }

    /**
     * Insert card into the deck
     * @param {Card} card - Card to be inserted
     * @returns The number of copies of this card in the deck after insertion,
     * or 0 if the card cannot be inserted
     */
    addCard(card) {
        if (!this.canAddCard(card.name))
            return 0;
        const item = this.deck1.get(card.name);
        if (item !== undefined) {
            item.count += 1;
            this.size += 1;
            return item.count;
        }
        else {
            this.deck1.set(card.name, {
                count: 1,
                card: card
            });
            this.size += 1;
            return 1;
        }
    }

    /**
     * Remove card from the deck
     * @param {String} card - Name of the card to be removed
     * @returns The number of copies of this card in the deck after remove
     * @throws In case there is no card with given name in the deck
     */
    removeCard(cardName) {
        if (this.deck1.has(cardName)) {
            const item = this.deck1.get(cardName);
            this.size -= 1;
            if (item.count == 1) {
                this.deck1.delete(cardName);
                return 0;
            }
            else {
                item.count -= 1;
                return item.count;
            }
        }
        else {
            throw new Error("Key not found: " + card.name);
        }
    }

    getCard(cardName) {
        return this.deck1.get(cardName);
    }

    hasCard(cardName) {
        return this.deck1.get(cardName) !== undefined;
    }

    canAddCard(cardName) {
        if (this.size >= 60) {
            return false;
        }
        const item = this.deck1.get(cardName);
        if (item === undefined) {
            return true;
        }
        return (item.count < item.card.limit);
    }

    #mapCardColor(color) {
        switch (color) {
            case "W": return "White";
            case "U": return "Blue";
            case "B": return "Black";
            case "R": return "Red";
            case "G": return "Green";
            default: return "Colorless";
        }
    }

    #mapCardColorToIndex(color) {
        switch (color) {
            case "W": return 0;
            case "U": return 1;
            case "B": return 2;
            case "R": return 3;
            case "G": return 4;
            default: return 5;
        }
    }

    colorStats() {
        const res = [
            { color: 'White', count: 0 },
            { color: 'Blue', count: 0 },
            { color: 'Black', count: 0 },
            { color: 'Red', count: 0 },
            { color: 'Green', count: 0 },
            { color: 'Colorless', count: 0 }
        ];
        this.deck1.forEach(item => {
            const colors = item.card.colors;
            colors.forEach(color => {
                res[this.#mapCardColorToIndex(color)].count += item.count;
            });
        });

        return res;
    }

    manaCostStats() {
        const res = [
            { cost: 0, count: 0 },
            { cost: 1, count: 0 },
            { cost: 2, count: 0 },
            { cost: 3, count: 0 },
            { cost: 4, count: 0 },
            { cost: 5, count: 0 },
            { cost: 6, count: 0 },
            { cost: '7+', count: 0 }
        ];
        this.deck1.forEach(item => {
            const cmc = item.card.cmc;
            if (cmc >= 7) {
                res[7].count += item.count;
            }
            else {
                res[cmc].count += item.count;
            }
        });
        return res
    }
}


export { Deck }
