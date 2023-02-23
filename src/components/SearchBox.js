import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const SearchBox = (movies, setSearchValue) => {
    const handleSubmit = (e) => e.preventDefault()

    const handleSearchChange = (e) => {
        if (!e.target.value) return setSearchValue(movies)

        const resultArray = movies.filter(movie => movie.title.includes(e.target.value))
        setSearchValue(resultArray)
    }

    return (
        <header>
            <form className='search' onSubmit={handleSubmit}>
                <input className='search_input' placeholder='Search' type='text' id='search' onChange={handleSearchChange} />

                <button className='search_button'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </form>
        </header >
    );
};

export default SearchBox;