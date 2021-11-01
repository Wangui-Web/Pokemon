import React from 'react'
import "../App.css"

function Search({ handleChange, handleSubmit }) {
    return (
        <div className="searchContainer">
            <input type="search" name="q" onChange={handleChange} placeholder="Enter pokemon name..."/>
            <button onClick={handleSubmit}>Search</button>
        </div>    
    )
}

export default Search
