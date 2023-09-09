import React, { ChangeEventHandler, HtmlHTMLAttributes, InputHTMLAttributes } from 'react';
import { TbCameraPlus } from 'react-icons/tb';
import './CInputImage.scss';

interface CInputImageProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange: ChangeEventHandler<HTMLInputElement>,
}

export const CInputImage: React.FC<CInputImageProps> = ({
  onChange,
}) => {
  return (
    <label htmlFor="profile-image" className='add__image' role='profile-image'>
      <input type="file" id='profile-image' name='profile-image' onChange={(e) => onChange(e)} />
      <TbCameraPlus className='add__image__icon' role='profile-image-icon' />
    </label>
  )
}
