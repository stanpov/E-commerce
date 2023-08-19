import React from 'react';
import './PageWrapper.scss';
interface PageWrapperProps {
    children?: React.ReactNode
}

export const PageWrapper: React.FC<PageWrapperProps> = ({
    children
}) => {
    return (
        <div className='pages__wrapper'>
            {children}
        </div>
    )
}
