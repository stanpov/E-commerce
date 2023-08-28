import { Link } from "react-router-dom";
import './Logo.scss';

export const Logo = () => {
    return (
        <Link to={"/"} className="logo__container" role="logo">
            <img src="eShopLogo.png" alt="mainLogo" className="logo__container__image" />
        </Link>
    )
}


