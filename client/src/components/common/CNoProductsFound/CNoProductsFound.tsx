import './CNoProductsFound.scss';

export const CNoProductsFound = () => {
  return (
    <div className='product__not__found__message'>
        <h2> Sorry <span>!</span></h2>
        <h3>no products <span>found</span>.</h3>
        <p>Your search did not match any products. <br/> <span>Please try again.</span></p>
        <img src='bag.png' alt="bag" />
    </div>
  )
}
