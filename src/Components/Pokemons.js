import React from 'react'
import "../App.css"
import Pokemon from './Pokemon'

function Pokemons({ pokemons}) {
    console.log(pokemons)
    return (
        <div className="pokemonContainer">
            {pokemons.map(pokemon => {
               return <Pokemon key={pokemon.name} pokemon={pokemon} />
            })}
            
        </div>
    )
}

export default Pokemons
