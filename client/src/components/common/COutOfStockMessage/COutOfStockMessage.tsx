import React from 'react';
import { AiOutlineStop } from 'react-icons/ai';
import './COutOfStockMessage.scss';

export const COutOfStockMessage = () => {
  return (
    <p className='out__of__stock__message'>out of stock <AiOutlineStop/> </p>
  )
}
