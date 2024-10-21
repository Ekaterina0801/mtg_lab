import { CardContainer } from "./components/CardContainer.js";
import { CardSelector } from "./components/CardSelector.js";
import { Mtg } from "./api/mtg.js";
import { Card } from "./model/card.js";
import { Deck } from "./model/deck.js";
import { ColorStats } from "./widgets/colorStats.js";
import { ManaCostStats } from "./widgets/manaCostStats.js";

const SEARCH_DELAY = 1000;
const EMPTY_DECK_PLACEHOLDER_TEXT = "Ваша колода пуста";

document.addEventListener("DOMContentLoaded", setup);

function setup() {
    const mtg = new Mtg();
    const deck = new Deck();

    const cardNameInput = document.getElementById("cardNameInput");
    const deckPlaceholder = document.getElementById("deckPlaceholder");
    deckPlaceholder.textContent = EMPTY_DECK_PLACEHOLDER_TEXT;

    let timer;
    cardNameInput.addEventListener("input", (e) => {
        clearTimeout(timer);
        timer = setTimeout(() => search(mtg, deck, cardNameInput.value), SEARCH_DELAY);
    });

    // Запуск начального поиска
    search(mtg, deck, cardNameInput.value);
}

function addCard(card, deck) {
    const addResult = deck.addCard(card);
    if (addResult > 0) {
        if (addResult === 1) {
            const deckContainer = document.getElementById("deckContainer");
            const cardElement = new CardContainer().build(
                { card, deck },
                new Map([
                    ["click", () => showCard(card, deck)],
                    ["mouseover", function () { this.style.cursor = "pointer"; }]
                ])
            );
            deckContainer.appendChild(cardElement);
        }

        refreshStats(deck);
        hideDeckPlaceholder(deck);
    }
    return addResult;
}

function removeCard(card, deck) {
    const removeResult = deck.removeCard(card.name);
    if (removeResult === 0) {
        const deckContainer = document.getElementById("deckContainer");
        const cardElem = document.getElementById(`deck_cardContainer_${card.name}`);
        deckContainer.removeChild(cardElem);
    }
    refreshStats(deck);
    showDeckPlaceholderIfEmpty(deck);
    return removeResult;
}

function search(mtg, deck, name = "") {
    mtg.loadCards(name).then((searchResults) => {
        const menu = document.getElementById('listContainer');
        menu.innerHTML = '';  // Очищаем меню

        const list = document.createElement('ul');
        searchResults.forEach((cardDto) => {
            const card = new Card(cardDto);
            const listItem = document.createElement('li');

            const button = createButton(card.name, () => showCard(card, deck), "buttonCardSearch");
            listItem.appendChild(button);
            list.appendChild(listItem);
        });

        menu.appendChild(list);
    });
}

function refreshStats(deck) {
    updateWidget("manaStats", new ManaCostStats(), deck.manaCostStats());
    updateWidget("colorStats", new ColorStats(), deck.colorStats());
}

function showCard(card, deck) {
    const selectedCard = document.getElementById('selectedCard');
    const generated = new CardSelector().build(
        { card, deck, addCard, removeCard }
    );
    selectedCard.replaceChild(generated, selectedCard.firstChild);
}

// === Утилиты ===

function createButton(text, onClick, className = "") {
    const button = document.createElement('button');
    button.textContent = text;
    button.classList.add(className);
    button.onclick = onClick;
    return button;
}

function updateWidget(widgetId, widgetInstance, statsData) {
    const widgetElem = document.createElement("div");
    widgetElem.id = widgetId;
    widgetInstance.buildStats(widgetElem, statsData);
    const existingWidget = document.getElementById(widgetId);
    existingWidget.replaceWith(widgetElem);
}

function hideDeckPlaceholder(deck) {
    if (deck.size === 1) {
        document.getElementById("deckPlaceholder").textContent = "";
    }
}

function showDeckPlaceholderIfEmpty(deck) {
    if (deck.size === 0) {
        document.getElementById("deckPlaceholder").textContent = EMPTY_DECK_PLACEHOLDER_TEXT;
    }
}
