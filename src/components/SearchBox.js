import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const SearchBox = (props) => {
    const handleSubmit = (e) => e.preventDefault()

    const handleSearchChange = (e) => {

    }

    return (
        <header>
            <form className='search' onSubmit={handleSubmit}>
                <input className='search_input' type='text' id='search' onChange={handleSearchChange} >


                </input>
                <button className='search_button'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </form>
        </header >
    );
};

export default SearchBox;