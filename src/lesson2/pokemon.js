import _ from 'lodash';

async function  getPokemons (url, i = 0) {
  //console.log('getPokemons ', url, i);
  const response = await fetch(url);
  const page = await response.json();
  const pokemons = page.results;

  if(i > 1) {
    return pokemons;
  }

  if(page.next) {
    const pokemons2 = await getPokemons(page.next, i + 3);
    return [
      ...pokemons,
      ...pokemons2
    ]
  }

  return pokemons;
}

async function getPokemonId(url) {

  const fetchPokeId = await fetch(url);
  const pokemon = await fetchPokeId.json();
  return pokemon;
}

async function showPokemons(res) {

  try{

  let pokemonsInfo = await getPokemons('http://pokeapi.co/api/v2/pokemon');
  let pokemonPromises = pokemonsInfo.map(info => {
    return getPokemonId(info.url);
  });

  let fields = ['id',
                'name',
                'base_experience', 
                'height', 
                'is_default', 
                'order', 
                'weight'
               ];

  let pokemonsFull = await Promise.all(pokemonPromises);
  let pokemons = pokemonsFull.map((pokemon) => {
    return _.pick(pokemon, fields);
  });

  let sortPokemons = _.sortBy(pokemons, pokemon => pokemon.weight);

  return res.json(
    sortPokemons
  );

  } catch(err) {
    console.log(err);
    return res.json({ err });
  }

}



export { showPokemons };