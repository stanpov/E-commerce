import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import './Home.scss';
import { PageWrapper } from '../../components/common/PageWrapper/PageWrapper';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../Redux';

export const Home = () => {
    // const dispatch = useDispatch<AppDispatch>();


    return (
        <PageWrapper>
            <section className='home__page'>
                <h1 className='home__page__title'>eShop</h1>
                <h3 className='home__page__animation'> Choose us because
                    <TypeAnimation
                        sequence={[
                            ' we will give you the best price!', 
                            3000,
                            ' our products are with high quality!', 
                            3000, 
                            'we\'ll give you an extra-long warranty!',
                            3000,
                            ' you delivery will be for free!',
                            3000,
                        ]}
                        wrapper="span"
                        cursor={true}
                        repeat={Infinity}
                        style={{ fontSize: '1em', paddingLeft: '5px', }}
                    />
                </h3>
            </section>
        </PageWrapper>
    )
}