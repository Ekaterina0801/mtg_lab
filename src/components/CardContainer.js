class CardContainer {
    constructor() {}

    build(params, callbacks = {}) { 
        const result = document.createElement("div");
        result.className = "cardContainer"; 

        result.id = `deck_cardContainer_${params.card.name}`;

        const image = document.createElement('img');
        image.className = "cardImage"; 
        image.src = params.card.imageUrl;
        image.alt = `${params.card.name} image`; 
        result.appendChild(image);


        const cardPreview = document.createElement("div");
        cardPreview.textContent = params.card.name; 
        result.appendChild(cardPreview);

 
        if (callbacks && typeof callbacks === 'object') {
            Object.entries(callbacks).forEach(([eventType, action]) => {
                result.addEventListener(eventType, action);
            });
        }

        return result;
    }
}

export { CardContainer };
