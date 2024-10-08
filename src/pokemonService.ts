import axios from 'axios';

const POKEAPI_URL = 'https://beta.pokeapi.co/graphql/v1beta';

export const fetchPokemons = async (limit: number = 12, offset: number = 0) => {
  const query = `
    query {
      pokemon_v2_pokemon(limit: ${limit}, offset: ${offset}) {
        id
        name
      }
    }
  `;

  const response = await axios.post(POKEAPI_URL, { query });
  return response.data.data.pokemon_v2_pokemon;
};
