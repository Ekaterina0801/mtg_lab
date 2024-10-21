class CardCounter {
    constructor() {}

    build({ deck, card }, callbacks) {
        const result = document.createElement('div');
        result.classList.add("cardText");

        const actualNumberInDeck = deck.getCard(card.name)?.count ?? 0;

        result.innerHTML = `Карт в колоде: ${actualNumberInDeck} / ${card.limit}`;

        if (callbacks) {
            Object.entries(callbacks).forEach(([eventType, action]) => {
                result.addEventListener(eventType, action);
            });
        }

        return result;
    }
}

export { CardCounter };
