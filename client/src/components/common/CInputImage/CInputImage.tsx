import React from 'react';
import {TbCameraPlus} from 'react-icons/tb';
import './CInputImage.scss';


export const CInputImage = () => {
  return (
    <label htmlFor="profile-image" className='add__image' role='profile-image'>
        <input type="file" id='profile-image' name='profile-image' />
        <TbCameraPlus className='add__image__icon' role='profile-image-icon'/>
    </label>
  )
}
