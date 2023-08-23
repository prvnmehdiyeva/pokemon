const pokeContainer = document.getElementById("poke_container");
const colors = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
};

const main_types = Object.keys(colors);

const fetchPokemons = async () => {
  for (let i = 1; i <= 20; i++) {
    await getFetch(i);
  }
};
async function getFetch(id) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    createPoke(data);
  } catch (error) {
    console.error("Data not found:", error);
  }
}

function createPoke(pokemon) {
  const poke_types = pokemon.types.map((type) => type.type.name);
  const type = main_types.find((type) => poke_types.indexOf(type) > -1);

  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const div = document.createElement("div");
  div.classList.add("pokemon");
  const color = colors[type];
  div.style.backgroundColor = color;
  div.innerHTML = `<div class="img-container">
        <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="${pokemon.name}" />
      </div>
      <div class="info">
        <span class="number">#${pokemon.id}</span>
        <h3 class="name">${pokemon.name}</h3>
        <small class="type">Type: <span>${type}</span></small>
      </div>`;
  pokeContainer.appendChild(div);
}

fetchPokemons();
