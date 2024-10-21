const mtg = require('mtgsdk')

class Mtg {

    constructor(baseUrl = "https://api.magicthegathering.io/v1/") {
        this.baseUrl = baseUrl;
        this.deck = require('../model/deck');
    }

    async loadCards(name){
        return mtg.card.where({pageSize: 100, name: name});
    }
}


export {Mtg}
