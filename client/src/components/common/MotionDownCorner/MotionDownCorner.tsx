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
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className='corner__gradient__down'>
        </motion.div>
    )
}