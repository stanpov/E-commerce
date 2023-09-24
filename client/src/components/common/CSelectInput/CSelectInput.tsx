import React from 'react';
import './CSelectInput.scss';
import { BsSortDown } from 'react-icons/bs';

interface CSelectInputProps { }

export const CSelectInput: React.FC<CSelectInputProps> = () => {
    return (
        <section className='sort'>
            <label htmlFor="sortBy">sort <BsSortDown/></label>
            <select name="sortBy" id="sortBy">
                <option value=""> </option>
                <option value="productName,1">Alphabetical A - Z</option>
                <option value="productName,-1">Alphabetical Z - A</option>
                <option value="price">Low - High price</option>
                <option value="price,desc">High - Low price</option>
            </select>
        </section>
    )
}
