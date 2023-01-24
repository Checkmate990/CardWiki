const cardList = document.getElementById("card-list");
const searchButton = document.getElementById("search-button");
const discoverButton = document.getElementById("discover-button");
const searchInput = document.getElementById("search");
const searchLabel = document.querySelector("label[for='search']");
const cardNames = new Set();

discoverButton.addEventListener("click", () => {
  cardList.style.display = "";
  searchInput.style.display = "";
  searchButton.style.display = "";
  searchLabel.style.display = "";
  fetch("https://api.magicthegathering.io/v1/cards")
    .then(response => response.json())
    .then(data => {
      data.cards.forEach(card => {
        if (!cardNames.has(card.name)) {
          cardNames.add(card.name);
          const cardItem = document.createElement("li");
          cardItem.classList.add("card");
          cardItem.innerHTML = `
            <img src="${card.imageUrl}" alt="${card.name}">
            <h3>${card.name}</h3>
            <p class="type hidden">Type: ${card.type}</p>
            <p class="rarity hidden">Rarity: ${card.rarity}</p>
          `;
          cardItem.addEventListener("click", () => {
            cardItem.classList.toggle("active");
          });
          cardList.appendChild(cardItem);
        }
      });
    })
    .catch(error => console.error(error));
});

searchButton.addEventListener("click", () => {
  const searchValue = searchInput.value.toLowerCase();
  const cards = cardList.getElementsByTagName("li");
  Array.from(cards).forEach(card => {
    const cardName = card.getElementsByTagName("h3")[0].innerText;
    if (cardName.toLowerCase().indexOf(searchValue) === -1) {
      card.style.display = "none";
    } else {
      card.style.display = "";
    }
    });
    });
