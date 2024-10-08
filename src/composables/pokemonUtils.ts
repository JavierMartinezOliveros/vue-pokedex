export const getPokemonImageUrl = (pokemonId: number): string => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
};

export const capitalizeFirstLetter = (name: string | undefined) => {
  if (typeof name !== 'string') {
    return '';
  }
  return name.charAt(0).toUpperCase() + name.slice(1);
};

export const formattedNumber = (pokemonId: number): string => {
  return pokemonId.toString().padStart(3, '0')
};