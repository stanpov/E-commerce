import React, { useState } from 'react';
import { AiOutlineCloseCircle, AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';
import { Image } from '../../../interfaces/interfaces';
import './CImageModal.scss';

interface CImageModalProps {
    startIndex: number,
    images: Image[],
    closeModal: () => void
}
export const CImageModal: React.FC<CImageModalProps> = ({
    startIndex,
    images,
    closeModal
}) => {

    const [currentIndex, setCurrentIndex] = useState(startIndex);

    const goLeftHandler = () => {
        const isFirstImage = currentIndex === 0;
        const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    }

    const goRightHandler = () => {
        const isLastImage = currentIndex === images.length - 1;
        const newIndex = isLastImage ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }

    return (
        <div className='modal' onClick={closeModal} role='slider'>
            <div className='modal__image' onClick={(e) => e.stopPropagation()}>
                <AiOutlineCloseCircle className='modal__image__close' onClick={closeModal} data-testid={'close-svg'}/>
                <AiOutlineDoubleRight className='modal__image__right' onClick={goRightHandler} data-testid={'go-right-svg'}/>
                <AiOutlineDoubleLeft className='modal__image__left' onClick={goLeftHandler} data-testid={'go-left-svg'}/>
                <p>{currentIndex + 1} / {images.length}</p>
                <img src={images[currentIndex].imageUrl} alt={`${currentIndex}`} />
            </div>
        </div>
    )
}
