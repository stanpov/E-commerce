import React, { InputHTMLAttributes } from 'react';
import './CRadio.scss';

interface CRadioProps extends InputHTMLAttributes<HTMLInputElement> {
		category:string,
		radioName:string,
}

export const CRadio: React.FC<CRadioProps> = ({
	category,
	radioName
}) => {
	return (
		<div className='radio'>
			<input type="radio" id={radioName} name={category} value={radioName}/>
			<label htmlFor={radioName}>{radioName}</label>
		</div>
	)
}
