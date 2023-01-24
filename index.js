// fetch(`http://api.open-notify.org/astros.json`)
//  .then(response => response.json())
//  .then(data => {
//     console.log(data);
//     data.people.forEach(e=>{
//         console.log(e.name);
//         console.log(e.craft);
//         const h1 = document.createElement('h1');
//         h1.classList.add('person');
//         h1.innerText = e.name;
//         document.body.appendChild(h1);
//         if (e.craft === 'ISS'){
    //             const p = document.createElement('p');
    //             p.textContent = e.craft;
    //             h1.appendChild(p);
    //         }
    //         else{
        //             const h5 = document.createElement('h5');
        //             h5.textContent = e.craft;
        //             h1.appendChild(h5);
        //         }
        //     })
        //  })
        
let pokeNumber = Math.floor(Math.random() *200);
let date  = new Date();
let current = `${date.getMonth()+1}/${date.getDate()}`;

function renderPoke(){
    fetch('https://pokeapi.co/api/v2/pokemon?limit=500&offset=0')
    .then(response => response.json())
    .then(data => {
        const poke = data.results[pokeNumber].url;

        fetch(poke)
        .then(r=>r.json())
        .then(pokemon=>{

            console.log(pokemon);
            console.log(pokemon.sprites.front_default);

            let h1 = document.createElement('h1');
            h1.textContent = `${pokemon.name.slice(0,1).toUpperCase()}${pokemon.name.slice(1)}`;
            h1.className = 'pokemon';

            let img = document.createElement('img')
            img.classList.add('pokemon')
            img.src = pokemon.sprites.front_default;
            img.alt = pokemon.name;

            const p = document.createElement('p');
            p.textContent = `${h1.textContent} is your Pokemon. Click for a surprise!`;
            p.id = 'pokemon-tag'
            p.style.fontWeight = 'bold';

            document.querySelector('#header').append(img,h1,p);

            img.addEventListener('click',()=>{
                img.src = pokemon.sprites.front_shiny;
                p.textContent = `${h1.textContent} is now shiny!`
            })
        })
    })
}
renderPoke()

const sear = document.querySelector("#api");
sear.addEventListener('submit',(e)=>{
    e.preventDefault();
    const poke = e.target.search.value;
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=500&offset=0`)
    .then(r=>r.json())
    .then(data=>{
        const newPoke = data.results[e.target.search.value].url;
        fetch(newPoke)
        .then(r=>r.json())
        .then(pokemon=>{
            let h1 = document.createElement('h1');
            h1.textContent = `${pokemon.name.slice(0,1).toUpperCase()}${pokemon.name.slice(1)}`;
            h1.className = 'new-pokemon';

            let img = document.createElement('img')
            img.className = 'new-pokemon'
            img.src = pokemon.sprites.front_default;
            img.alt = pokemon.name;

            const p = document.createElement('p');
            p.textContent = `${h1.textContent} is your Pokemon. Click for a surprise!`;
            p.id = 'new-pokemon-tag'
            p.style.fontWeight = 'bold';

            document.querySelector('#newPoke').append(img,h1,p);
            img.addEventListener('click',()=>{
                img.src = pokemon.sprites.front_shiny;
                p.textContent = `${h1.textContent} is now shiny!`
            })
        })
    })
})


fetch(`http://numbersapi.com/${current}/date`)
.then(response=>response.text())
.then(data=>{
    //const numFacts = data.contents.nod.numbers;
    const ul = document.createElement('ul')
    ul.textContent = data;
    ul.style.fontSize = '0.65em';
    document.querySelector('#today-info').append(ul);
    // const h2 = document.createElement('h2');
    // h2.textContent = numFacts.number;
})




