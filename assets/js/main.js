const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const loadPokemonStatsToHtml = document.getElementById('pokemonStats')

const maxRecords = 151
const limit = 10;
let offset = 0;

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
                <li class="pokemon ${pokemon.type}">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>

                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                        <img src="${pokemon.photo}" 
                            alt="${pokemon.name}">
                    </div>
                </li> 
        `).join('')
        pokemonList.innerHTML += newHtml

        const pokemonStats = pokemons.map((pokemon) => `
        <section class="p-4">
            <div class="poke-stats">
                <div class="pokemon-detail">
                    <h1 class="name">${pokemon.name}</h1>
                    ${pokemon.types.map((type) => `<span class="type ${type}">${type}</span>`).join('')}
                </div>
                <span class="text-white">#${pokemon.number}</span>
            </div>
        </section>

        <section class="about-pokemon ${pokemon.type}">
            <img class="pokemon-image"
                src="${pokemon.photo}"
                alt="${pokemon.name}">

            <h2 class="text-center pb-4 ">About</h2>

            <table class="table">
                <tr>
                    <td class="stats-size">Height</td>
                    <td>${pokemon.height} cm</td>
                </tr>
                <tr>
                    <td class="stats-size">Weight</td>
                    <td>${pokemon.weight} kg</td>
                </tr>
                <tr>
                    <td class="stats-size">Abilities</td>
                    ${pokemon.abilities.map((ability) => `<td class="type ${ability}">${ability}</td>`).join('')}
                </tr>
            </table>
        </section>`
    ).join('')
    console.log(pokemonStats)
    loadPokemonStatsToHtml.innerHTML += pokemonStats
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordsNextPage = offset + limit

    if (qtdRecordsNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }

})

// function loadPokemonStats(offset, limit) {
//     pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
//     const pokemonStats = pokemons.map((pokemon) => `
//         <section class="p-4">
//             <a href="index.html">
//                 <i class="fa-solid fa-left-long fa-xl text-white"></i>
//             </a>
//             <div class="poke-stats">
//                 <div class="pokemon-detail">
//                     <h1 class="name">${pokemon.name}</h1>
//                     ${pokemon.types.map((type) => `<span class="type ${type}">${type}</span>`).join('')}
//                 </div>
//                 <span class="text-white">#${pokemon.number}</span>
//             </div>
//         </section>

//         <section class="about-pokemon">
//             <img class="pokemon-image"
//                 src="${pokemon.photo}"
//                 alt="${pokemon.name}">

//             <h2 class="text-center pb-4">About</h2>

//             <table class="table">
//                 <tr>
//                     <td class="stats-size">Height</td>
//                     <td>${pokemon.height} cm</td>
//                 </tr>
//                 <tr>
//                     <td class="stats-size">Weight</td>
//                     <td>${pokemon.weight} kg</td>
//                 </tr>
//                 <tr>
//                     <td class="stats-size">Abilities</td>
//                     ${pokemon.abilities.map((ability) => `<td class="type ${ability}">${ability}</td>`).join('')}
//                 </tr>
//             </table>
//         </section>`
//     ).join('')
//     console.log(pokemonStats)
//     loadPokemonStatsToHtml.innerHTML += pokemonStats

//     })
// }