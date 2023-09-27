import React from 'react';
import './CImageModal.scss';
import { AiOutlineCloseCircle, AiOutlineRightCircle ,AiOutlineLeftCircle } from 'react-icons/ai';

interface CImageModalProps {
    image: string,
    closeModal:()=>void
}
export const CImageModal: React.FC<CImageModalProps> = ({
    image,
    closeModal
}) => {

    return (
        <div className='modal' onClick={closeModal}>
            <div className='modal__image' onClick={(e)=>e.stopPropagation()}>
                <AiOutlineCloseCircle className='modal__image__close' onClick={closeModal}/>
                <AiOutlineRightCircle className='modal__image__right'/>
                <AiOutlineLeftCircle className='modal__image__left'/>
                <img src={image} alt="" />
            </div>
        </div>
    )
}
