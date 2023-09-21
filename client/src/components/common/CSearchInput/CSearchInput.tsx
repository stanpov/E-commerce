import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import './CSearchInput.scss';
import { useAppDispatch } from '../../../Redux/hooks';
import { getSearchedProducts } from '../../../Redux/Products/ProductsActions';

interface CSearchInputProps { }

export const CSearchInput: React.FC<CSearchInputProps> = () => {

    const [search, setSearch] = useState({ search: '' });
    const dispatch = useAppDispatch();

    const searchHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(getSearchedProducts(search.search));
    }

    return (
        <form className='search' onSubmit={searchHandler} >
            <label htmlFor="search" className='search__input'>
                <BsSearch />
                <input
                    type="text"
                    id='search'
                    name='search'
                    value={search.search}
                    onChange={(e) => setSearch({ search: e.target.value })}
                />
            </label>

            <input className='search__submit' type="submit" id='submit' name='submit' value={'Search'} />
        </form>

    )
}
