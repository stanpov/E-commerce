import React from 'react';
import { AiOutlineStop } from 'react-icons/ai';
import './COutOfStockMessage.scss';

interface COutOfStockMessageProps { }

export const COutOfStockMessage: React.FC<COutOfStockMessageProps> = () => {
  return (
    <p className='out__of__stock__message'>out of stock <AiOutlineStop /> </p>
  )
}
