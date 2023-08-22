import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import './Home.scss';
import { PageWrapper } from '../../components/common/PageWrapper/PageWrapper';
import { Logo } from '../../components/common/Logo/Logo';
import { motion } from 'framer-motion';

export const Home = () => {

    return (
        <PageWrapper>
            <section className='home__page'>
                {/* <h1 className='home__page__title'>eShop</h1> */}
                <motion.div
                    variants={{
                        start: { width: 0, opacity: 0 },
                        end: { width: 320, opacity: 1 },
                    }}
                    initial='start'
                    whileInView='end'
                    animate={{ rotateY: 360 }}
                    transition={{ duration: 2, delay: 1 }}
                    className='home__page__logo__wrapper'>
                    <Logo />
                </motion.div>
                <h3 className='home__page__animation'> Few reasons to choose eShop <br />
                    <TypeAnimation
                        sequence={[
                            ' High quality products !', 'Best brands !!!',
                            3000,
                            'Extra-long warranty !', 'Plus 12 months !!!',
                            3000,
                            ' Best price !', 'Up to -70% OFF !!!',
                            3000,
                             'Great Deals !','FREE Delivery !!!',
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