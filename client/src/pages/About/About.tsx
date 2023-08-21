import React from 'react';
import { motion } from "framer-motion";
import { PageWrapper } from '../../components/common/PageWrapper/PageWrapper';
import { Logo } from '../../components/common/Logo/Logo';
import { BsLaptop, BsPaypal } from 'react-icons/bs';
import { FiMonitor, FiSmartphone } from 'react-icons/fi';
import { CiBadgeDollar } from 'react-icons/ci';
import { FaFileContract, FaDhl, FaFedex } from 'react-icons/fa';
import { AiOutlineFileDone } from 'react-icons/ai';
import { RiVisaFill } from 'react-icons/ri';
import './About.scss';

export const About: React.FC = () => {

    return (
        <PageWrapper>

            <section className='about'>

                <motion.article
                    variants={{
                        hidden: { opacity: 0, y: 100 },
                        visible: { opacity: 1, y: 0 },
                    }}
                    initial='hidden'
                    whileInView='visible'
                    transition={{ duration: 1 }}
                    className='about__article'
                >
                    <div className='about__article__content'>
                        <h1>Why we should be <br /> <span>your choice!?</span> </h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam dolorum ipsa iure. Delectus molestias accusamus natus quo mollitia, iure vel laudantium. Saepe aspernatur totam doloremque similique qui vitae praesentium placeat!</p>
                        <div className='about__article__content__logo'>
                            <Logo />
                        </div>
                    </div>
                </motion.article>

                <motion.article
                    variants={{
                        hidden: { opacity: 0, x: -500 },
                        visible: { opacity: 1, x: 0 },
                    }}
                    initial='hidden'
                    whileInView='visible'
                    transition={{ duration: 0.8 }}
                    className='about__article'>
                    <div className='about__article__content '>
                        <h1>Best products <br /> Best price </h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas ad nihil eveniet perferendis distinctio amet ab consectetur facere ipsa facilis! Itaque, odit cupiditate. Nobis perspiciatis soluta dolores! Vero, est sunt.</p>
                        <div className='about__article__content__icons '>
                            <BsLaptop className='about__icon' />
                            <FiMonitor className='about__icon' />
                            <FiSmartphone className='about__icon' />
                            <CiBadgeDollar className='about__icon' />
                        </div>
                    </div>
                </motion.article>

                <motion.article
                    variants={{
                        hidden: { opacity: 0, x: 500 },
                        visible: { opacity: 1, x: 0 },
                    }}
                    initial='hidden'
                    whileInView='visible'
                    transition={{ delay: 0., duration: 1 }}
                    className='about__article'>
                    <div className='about__article__content '>
                        <h1>Quality and warranty</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas ad nihil eveniet perferendis distinctio amet ab consectetur facere ipsa facilis! Itaque, odit cupiditate. Nobis perspiciatis soluta dolores! Vero, est sunt.</p>
                        <div className='about__article__content__icons '>
                            <FaFileContract className='about__icon' />
                            <AiOutlineFileDone className='about__icon' />
                        </div>
                    </div>
                </motion.article>

                <motion.article
                    variants={{
                        hidden: { opacity: 0, y: 100 },
                        visible: { opacity: 1, y: 0 },
                    }}
                    initial='hidden'
                    whileInView='visible'
                    transition={{ duration: 1 }}
                    className='about__article'>
                    <div className='about__article__content '>
                        <h1>Delivery and payment</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas ad nihil eveniet perferendis distinctio amet ab consectetur facere ipsa facilis! Itaque, odit cupiditate. Nobis perspiciatis soluta dolores! Vero, est sunt.</p>
                        <div className='about__article__content__icons '>
                            <FaDhl className='about__icon' />
                            <FaFedex className='about__icon' />
                            <BsPaypal className='about__icon' />
                            <RiVisaFill className='about__icon' />
                        </div>
                    </div>
                </motion.article>
            </section>
        </PageWrapper>
    )
}

