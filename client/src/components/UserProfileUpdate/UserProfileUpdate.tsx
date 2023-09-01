import React from 'react'
import {motion} from 'framer-motion';
import { CLable } from '../common/CLable/CLable';
import { CInput } from '../common/CInput/CInput';
import { CInputImage } from '../common/CInputImage/CInputImage';
import './UserProfileUpdate.scss';

interface UserProfileUpdateProps {
    setIsUpdate:(updata:boolean) => void;
}

export const UserProfileUpdate: React.FC<UserProfileUpdateProps> = ({
    setIsUpdate,
}) => {

    const saveHandler = () => {
        setIsUpdate(false)
    }
    return (
        <motion.article
        
        variants={{
            start: { opacity: 0 , scale:0.8},
            end: { opacity: 1 , scale: 1 }
        }}
        initial='start'
        animate='end'
        transition={{duration:1.3,delay:0.2 }} className='update__card'>
            <h2 className='update__card__title'>update your profile</h2>
            <section className='update__card__content'>
                <section className='update__card__content__image'>
                    <div className='update__card__content__image__wrapper'>
                        <div className='update__card__content__image__inside'>
                            <img src='https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png' alt="" />
                        </div>
                        <CInputImage/>
                    </div>
                </section>
                <section className='update__card__content__information'>
                    <ul className='update__card__content__information__list'>
                        <li className='update__card__content__information__list__item'>
                            <CLable inputId={'username'} title={'Username'} />
                            <CInput type={'text'} name={'username'} id={'username'} placeholder={'john-green'} />
                        </li>
                        <li className='update__card__content__information__list__item'>
                            <CLable inputId={'phone'} title={'Phone number'} />
                            <CInput type={'tel'} name={'phone'} id={'phone'} placeholder={'212 456 7890'} />
                        </li>
                        <li className='update__card__content__information__list__item'>
                            <CLable inputId={'address'} title={'Delivery address'} />
                            <CInput type={'text'} name={'address'} id={'address'} placeholder={'332, My Street, Kingston'} />
                        </li>
                    </ul>
                </section>
            </section>
            <button onClick={saveHandler} className='save__button'>save</button>
        </motion.article>

    )
}
