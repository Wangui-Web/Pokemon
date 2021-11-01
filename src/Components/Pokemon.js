import React from 'react'
import "../App.css"

function Pokemon({ pokemon }) {

    console.log(pokemon.name)
    return (
        <div className="pokemon">
            <a href={`https://www.pokemon.com/us/pokedex/${pokemon.name}`} target="_blank" rel="noreferrer">
                <img src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`} alt="avatar" />
                <h1>{pokemon.name}</h1>
            </a>
        </div>
    )
}

export default Pokemon
