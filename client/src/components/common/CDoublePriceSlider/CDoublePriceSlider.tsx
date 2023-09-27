import React, { useState } from 'react';
import Slider from 'react-slider';
import './CDoublePriceSlider.scss';
// import { useAppSelector } from '../../../Redux/hooks';
// import { allProducts } from '../../../Redux/Products/ProductSlice';

interface CDoublePriceSliderProps {
    setPrice: (price: number[]) => void;
};
let MIN = 0;
let MAX = 5000;

export const CDoublePriceSlider: React.FC<CDoublePriceSliderProps> = ({
    setPrice
}) => {

    const [values, setValues] = useState([MIN, MAX]);
    // const products = useAppSelector(allProducts);
    // console.log(values);

    const changeHandler = (value: number[]) => {
        setValues(value);
        setPrice(value);
    }

    return (
        <div className='price__slider__wrapper'>
            <h4>price range</h4>
            <div>
                <p>from <span>${values[0]}</span> to <span>${values[1]}</span></p>
                <p>range <span>${values[1] - values[0]}</span></p>
            </div>
            <Slider
                className={'slider'}
                value={values}
                min={MIN}
                max={MAX}
                onChange={changeHandler}
            />
        </div>
    )
}
