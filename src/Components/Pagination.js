import React from 'react'
import "../App.css"

function Pagination({ prevPage,nextPage}) {
    return (
        <div className="prevAndNextButtons">
            {prevPage && <button onClick={prevPage}>Prev</button>}
            {nextPage && <button onClick={nextPage}>Next</button>}
        </div>
    )
}

export default Pagination
