import React from 'react';
import { motion } from 'framer-motion';
import './MotionDownCorner.scss';
export const MotionDownCorner = () => {
    return (
        <motion.div
            variants={{
                start: { width: 0, height: 0 },
                end: { width: 280, height: 180 }
            }}
            initial='start'
            whileInView='end'
            transition={{ duration: 2, delay: 1 }}
            className='corner__gradient__down'>
        </motion.div>
    )
}