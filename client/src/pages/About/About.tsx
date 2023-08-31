import React from 'react';
import { motion } from "framer-motion";
import { PageWrapper } from '../../components/common/PageWrapper/PageWrapper';
import { Logo } from '../../components/common/Logo/Logo';
import { BsLaptop, BsPaypal } from 'react-icons/bs';
import { FiMonitor, FiSmartphone } from 'react-icons/fi';
import { FaFileContract, FaDhl, FaFedex } from 'react-icons/fa';
import { AiOutlineFileDone, AiOutlineDollarCircle } from 'react-icons/ai';
import { RiVisaFill } from 'react-icons/ri';
import { MotionUpCorner } from '../../components/common/MotionUpCorner/MotionUpCorner';
import { MotionDownCorner } from '../../components/common/MotionDownCorner/MotionDownCorner';
import './About.scss';

export const About: React.FC = () => {

    return (
        <PageWrapper>

            <section className='about' >

                <motion.article
                    variants={{
                        hidden: { opacity: 0, y: 100 },
                        visible: { opacity: 1, y: 0 },
                    }}
                    initial='hidden'
                    whileInView='visible'
                    transition={{ duration: 0.5 }}
                    className='about__article'
                >
                    <div className='about__article__content'>
                        <MotionUpCorner />
                        <h1 data-testid="heading-about-test">Why we should be <br /> <span>your choice!?</span> </h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam dolorum ipsa iure. Delectus molestias accusamus natus quo mollitia, iure vel laudantium. Saepe aspernatur totam doloremque similique qui vitae praesentium placeat!</p>
                        <div className='about__article__content__logo'>
                            <Logo />
                        </div>
                        <MotionDownCorner />
                    </div>
                </motion.article>

                <motion.article
                    variants={{
                        hidden: { opacity: 0, x: -300 },
                        visible: { opacity: 1, x: 0 },
                    }}
                    initial='hidden'
                    whileInView='visible'
                    transition={{ duration: 0.7 }}
                    className='about__article'>
                    <div className='about__article__content '>
                        <MotionUpCorner />
                        <h1 data-testid="heading-about-test">Best products <br /> Best price </h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas ad nihil eveniet perferendis distinctio amet ab consectetur facere ipsa facilis! Itaque, odit cupiditate. Nobis perspiciatis soluta dolores! Vero, est sunt.</p>
                        <div className='about__article__content__icons '>
                            <BsLaptop data-testid="icon-about-test" className='about__icon' />
                            <FiMonitor data-testid="icon-about-test" className='about__icon' />
                            <FiSmartphone data-testid="icon-about-test" className='about__icon' />
                            <AiOutlineDollarCircle data-testid="icon-about-test" className='about__icon' />
                        </div>
                        <MotionDownCorner />
                    </div>
                </motion.article>

                <motion.article
                    variants={{
                        hidden: { opacity: 0, x: 300 },
                        visible: { opacity: 1, x: 0 },
                    }}
                    initial='hidden'
                    whileInView='visible'
                    transition={{ delay: 0., duration: 0.7 }}
                    className='about__article'>
                    <div className='about__article__content '>
                        <MotionUpCorner />
                        <h1 data-testid="heading-about-test">Quality and warranty</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas ad nihil eveniet perferendis distinctio amet ab consectetur facere ipsa facilis! Itaque, odit cupiditate. Nobis perspiciatis soluta dolores! Vero, est sunt.</p>
                        <div className='about__article__content__icons '>
                            <FaFileContract data-testid="icon-about-test" className='about__icon' />
                            <AiOutlineFileDone data-testid="icon-about-test" className='about__icon' />
                        </div>
                        <MotionDownCorner />
                    </div>
                </motion.article>

                <motion.article
                    variants={{
                        hidden: { opacity: 0, y: 100 },
                        visible: { opacity: 1, y: 0 },
                    }}
                    initial='hidden'
                    whileInView='visible'
                    transition={{ duration: 0.5 }}
                    className='about__article'>
                    <div className='about__article__content '>
                        <MotionUpCorner />
                        <h1 data-testid="heading-about-test">Delivery and payment</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas ad nihil eveniet perferendis distinctio amet ab consectetur facere ipsa facilis! Itaque, odit cupiditate. Nobis perspiciatis soluta dolores! Vero, est sunt.</p>
                        <div className='about__article__content__icons '>
                            <FaDhl data-testid="icon-about-test" className='about__icon' />
                            <FaFedex data-testid="icon-about-test" className='about__icon' />
                            <BsPaypal data-testid="icon-about-test" className='about__icon' />
                            <RiVisaFill data-testid="icon-about-test" className='about__icon' />
                        </div>
                        <MotionDownCorner />
                    </div>
                </motion.article>
            </section>
        </PageWrapper>
    )
}

