import { useAppSelector } from '../../../Redux/hooks';
import { getCurrentProductName } from '../../../Redux/CurrentProduct/CurrentProductSlice';
import './CNoCommentsMessage.scss';
import { FaStar } from 'react-icons/fa';

export const CNoCommentsMessage = () => {

    const productName = useAppSelector(getCurrentProductName);

    return (
        <article className='no__comments__message'>
            <p data-testid={'no-comments-message'}>There are no comments yet for <span>{productName}!</span> <br/> <FaStar/>You could be the first !!! <FaStar/></p>
        </article>
    )
}
