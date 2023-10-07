import { motion } from 'framer-motion';
import './CNoProductsFound.scss';

export const CNoProductsFound = () => {
    return (
        <motion.div
            role='contentinfo'
            className='product__not__found__message'
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.5, delay: 1.2 } }}
        >
            <h2> Sorry <span>!</span></h2>
            <h3>no products <span>found</span>.</h3>
            <p>Your search did not match any products. <br /> <span>Please try again.</span></p>
            <img src='bag.png' alt="bag" />
        </motion.div>
    )
}