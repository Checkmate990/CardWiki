const cardList = document.getElementById("card-list");
const pokemonList = document.getElementById("pokemon-list");
const searchButton = document.getElementById("search-button");
const discoverButton = document.getElementById("discover-button");
const discoverPokemon = document.getElementById("discover-pokemon");
const searchInput = document.getElementById("search");
const searchLabel = document.querySelector("label[for='search']");
const cardNames = new Set();
document.querySelector("#header").style.display = "none";
document.querySelector("#random-poke").style.display = "none";
document.querySelector("#search-poke").style.display = "none";
document.querySelector("#api").style.display = "none";
document.querySelector("#newPoke").style.display = "none";



let PokemonPressed = false;

discoverButton.addEventListener("click", () => {
  cardList.style.display = "";
  searchInput.style.display = "";
  searchButton.style.display = "";
  searchLabel.style.display = "";
  fetch("https://api.magicthegathering.io/v1/cards")
    .then((response) => response.json())
    .then((data) => {
      data.cards.forEach((card) => {
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
    .catch((error) => console.error(error));
});

searchButton.addEventListener("click", () => {
  const searchValue = searchInput.value.toLowerCase();
  const cards = cardList.getElementsByTagName("li");
  Array.from(cards).forEach((card) => {
    const cardName = card.getElementsByTagName("h3")[0].innerText;
    if (cardName.toLowerCase().indexOf(searchValue) === -1) {
      card.style.display = "none";
    } else {
      card.style.display = "";
    }
  });
});

let pokeNumber = Math.floor(Math.random() * 200);
let date = new Date();
let current = `${date.getMonth() + 1}/${date.getDate()}`;

discoverPokemon.addEventListener("click", () => {
  document.querySelector("#header").style.display = "";
  document.querySelector("#random-poke").style.display = "";
  document.querySelector("#search-poke").style.display = "";
  document.querySelector("#api").style.display = "";
  document.querySelector("#newPoke").style.display = "";
  PokemonPressed = true;
});

function renderPoke() {
  if (PokemonPressed) {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=500&offset=0")
      .then((response) => response.json())
      .then((data) => {
        const poke = data.results[pokeNumber].url;

        fetch(poke)
          .then((r) => r.json())
          .then((pokemon) => {
            console.log(pokemon);
            console.log(pokemon.sprites.front_default);

            let h1 = document.createElement("h1");
            h1.textContent = `${pokemon.name
              .slice(0, 1)
              .toUpperCase()}${pokemon.name.slice(1)}`;
            h1.className = "pokemon";

            let img = document.createElement("img");
            img.classList.add("pokemon");
            img.src = pokemon.sprites.front_default;
            img.alt = pokemon.name;

            const p = document.createElement("p");
            p.textContent = `${h1.textContent} is your Pokemon. Hover your mouse for a surprise!`;
            p.id = "pokemon-tag";
            p.style.fontWeight = "bold";

            document.querySelector("#header").append(img, h1, p);

            img.addEventListener("mouseover", () => {
              img.src = pokemon.sprites.front_shiny;
              p.textContent = `${h1.textContent} is now shiny!`;
            });
          });
      });
    const sear = document.querySelector("#api");
    sear.addEventListener("submit", (e) => {
      e.preventDefault();
      const poke = e.target.search.value;
      fetch(`https://pokeapi.co/api/v2/pokemon?limit=500&offset=0`)
        .then((r) => r.json())
        .then((data) => {
          const newPoke = data.results[e.target.search.value].url;
          fetch(newPoke)
            .then((r) => r.json())
            .then((pokemon) => {
              let h1 = document.createElement("h1");
              h1.textContent = `${pokemon.name
                .slice(0, 1)
                .toUpperCase()}${pokemon.name.slice(1)}`;
              h1.className = "new-pokemon";

              let img = document.createElement("img");
              img.className = "new-pokemon";
              img.src = pokemon.sprites.front_default;
              img.alt = pokemon.name;

              const p = document.createElement("p");
              p.textContent = `${h1.textContent} is your Pokemon. Click for a surprise!`;
              p.id = "new-pokemon-tag";
              p.style.fontWeight = "bold";

              document.querySelector("#newPoke").append(img, h1, p);
              img.addEventListener("click", () => {
                img.src = pokemon.sprites.front_shiny;
                p.textContent = `${h1.textContent} is now shiny!`;
              });
            });
        });
    });

  
  }
}

discoverPokemon.addEventListener("click", renderPoke);
fetch(`http://numbersapi.com/${current}/date`)
.then((response) => response.text())
.then((data) => {
  //const numFacts = data.contents.nod.numbers;
  const ul = document.createElement("ul");
  ul.textContent = data;
  ul.style.fontSize = "0.65em";
  document.querySelector("#today-info").append(ul);
});



