import React from 'react';
import './CSearchInput.scss';
import { BsSearch } from 'react-icons/bs';

interface CSearchInputProps { }

export const CSearchInput: React.FC<CSearchInputProps> = () => {
    return (
        <form className='search'>
            <label htmlFor="search" className='search__input'>
                <BsSearch />
                <input type="text" id='search' name='search' />
            </label>

            <input className='search__submit' type="submit" id='submit' name='submit' value={'Search'} />
        </form>

    )
}
