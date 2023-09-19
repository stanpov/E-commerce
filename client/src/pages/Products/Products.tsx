import React from "react";
import { PageWrapper } from "../../components/common/PageWrapper/PageWrapper";
import { CRadio } from "../../components/common/CRadio/CRadio";
import './Products.scss';
import { FaList } from "react-icons/fa";
import { BsFillGridFill } from "react-icons/bs";
import { CSearchInput } from "../../components/common/CSearchInput/CSearchInput";
// import { CInputSubmit } from "../../components/common/CInputSubmit/CInputSubmit";

interface ProductsProps {

}

const category = ["TV", "Phones", "Laptops", "Headphones", "Monitors"];
const brands = ['Sony', 'Asus', 'Philips', 'Huawei', 'Apple'];

const Products: React.FC<ProductsProps> = () => {
    return (
        <PageWrapper>
            <section className="products">
                <aside className="products__filter">
                    <form className="products__filter__form">
                        <section className="products__filter__form__section">
                            <h4>category</h4>
                            <CRadio category="category" radioName="All categories" />
                            {category.map(x => <CRadio category="category" radioName={x} key={x} />)}
                        </section>
                        <section className="products__filter__form__section">
                            <h4>brands</h4>
                            <CRadio category="brands" radioName="All brands" />
                            {brands.map(x => <CRadio category="brands" radioName={x} key={x} />)}
                        </section>
                        <section className="products__filter__form__section">
                            <h4>price</h4>

                        </section>
                        {/* <CInputSubmit value={"filter"}/> */}

                    </form>
                </aside>
                <section className="products__section">
                    <article className="products__section__sorter">
                        <div className="products__section__sorter__icons">
                            <BsFillGridFill />
                            <FaList />
                        </div>
                        <div className="products__section__sorter__search">
                            <CSearchInput />
                        </div>
                        <div className="products__section__sorter__sort">

                        </div>
                    </article>
                    <article className="products__section__grid">

                    </article>
                </section>
            </section>
        </PageWrapper>
    )
};

export default Products;
