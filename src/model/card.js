class Card {

    constructor(cardDto) {
        this.name = cardDto.name;
        this.text = cardDto.text === undefined ? "" : cardDto.text;
        this.cmc = cardDto.cmc;
        this.imageUrl = cardDto.imageUrl === undefined ? "https://media.istockphoto.com/id/1055079680/vector/black-linear-photo-camera-like-no-image-available.jpg?s=612x612&w=0&k=20&c=P1DebpeMIAtXj_ZbVsKVvg-duuL0v9DlrOZUvPG6UJk=" : cardDto.imageUrl;
        this.colors = cardDto.colors === undefined ? new Array("C") : cardDto.colors;
        this.kind = cardDto.type;
        
        this.rules = this.#calcRules(cardDto);

        this.limit = this.#calcLimit();
    }

    #calcLimit() {
        if (String(this.kind).startsWith("Basic Land"))
            return Number.POSITIVE_INFINITY;
        if (this.rules.some((v, i) => v.startsWith("В колоде может быть любое количество карт с именами")))
            return Number.POSITIVE_INFINITY;
        return 4;
    }

    #calcRules(cardDto) {
        const res = new Array();
        this.text.split('\n').forEach(rule => {
            res.push(rule);
        });
        return res;
    }
}


export { Card }
