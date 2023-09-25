import React, { InputHTMLAttributes } from 'react';
import './CRadio.scss';

interface CRadioProps extends InputHTMLAttributes<HTMLInputElement> {
		category:string,
		radioName:string,
		value:string,
		defaultChecked:boolean
}

export const CRadio: React.FC<CRadioProps> = ({
	category,
	radioName,
	value,
	defaultChecked,
}) => {
	return (
		<div className='radio'>
			<input type="radio" id={radioName} name={category} value={value} defaultChecked={defaultChecked}/>
			<label htmlFor={radioName}>{radioName}</label>
		</div>
	)
}
