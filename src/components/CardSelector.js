import { CardCounter } from "./CardCounter.js";

class CardSelector {
    constructor() {

    }

    build(params, callbacks) {
        const result = document.createElement('div');
        result.id = 'card';

        const image = document.createElement('img');
        image.classList.add("center", "cardImage");
        image.src = params.card.imageUrl;
        result.appendChild(image);

        const cardDescription = document.createElement('div');
        params.card.text.split('\n').forEach(rule => {
            const rdiv = document.createElement("div");
            rdiv.classList.add("cardText")
            rdiv.innerHTML = rule;
            cardDescription.appendChild(rdiv);
        });
        cardDescription.classList.add("center");
        result.appendChild(cardDescription);

        let cardCountElement = new CardCounter().build(
            {
                card: params.card,
                deck: params.deck
            }
        );
        result.appendChild(cardCountElement);

        const addCardButton = document.createElement('button');
        addCardButton.classList.add("center", "addCard");
        addCardButton.innerHTML = "Добавить в колоду";
        addCardButton.disabled = !params.deck.canAddCard(params.card.name);
        result.appendChild(addCardButton);

        const removeCardButton = document.createElement('button');
        removeCardButton.classList.add("center", "removeCard");
        removeCardButton.innerHTML = "Убрать карту";
        removeCardButton.disabled = !params.deck.hasCard(params.card.name);
        result.appendChild(removeCardButton);

        addCardButton.addEventListener('click', function () {
            params.addCard(params.card, params.deck);
            let n = new CardCounter().build(
                {
                    card: params.card,
                    deck: params.deck
                }
            );
            cardCountElement.replaceWith(n)
            cardCountElement = n;
            addCardButton.disabled = !params.deck.canAddCard(params.card.name);
            removeCardButton.disabled = !params.deck.hasCard(params.card.name);
            console.log("Add " + params.card.name);
        });
        removeCardButton.addEventListener('click', function () {
            params.removeCard(params.card, params.deck);
            let n = new CardCounter().build(
                {
                    card: params.card,
                    deck: params.deck
                }
            );
            cardCountElement.replaceWith(n)
            cardCountElement = n;
            addCardButton.disabled = !params.deck.canAddCard(params.card.name);
            removeCardButton.disabled = !params.deck.hasCard(params.card.name);
            console.log("Remove " + params.card.name);
        });

        if (callbacks !== undefined) {
            callbacks.forEach((action, eventType) => {
                cardContainer.addEventListener(eventType, action);
            });
        }

        return result;
    }
}

export {CardSelector}