import React, { useEffect, useState } from "react";
import { PageWrapper } from "../../components/common/PageWrapper/PageWrapper";
import { CRadio } from "../../components/common/CRadio/CRadio";
import { FaList } from "react-icons/fa";
import { BsFillGridFill } from "react-icons/bs";
import { CSearchInput } from "../../components/common/CSearchInput/CSearchInput";
import { CSelectInput } from "../../components/common/CSelectInput/CSelectInput";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { getAllProducts } from "../../Redux/Products/ProductsActions";
import { allProducts, categories, isLoading } from "../../Redux/Products/ProductSlice";
import './Products.scss';
import { Loader } from "../../components/common/Loader/Loader";
import { GridProductCard } from "../../components/common/GridProductCard/GridProductCard";

interface ProductsProps {

}

const brands = ['Sony', 'Asus', 'Philips', 'Huawei', 'Apple'];

const Products: React.FC<ProductsProps> = () => {

    const dispatch = useAppDispatch();
    const category = useAppSelector(categories);
    const products = useAppSelector(allProducts);
    const isLoadingProducts = useAppSelector(isLoading);
    const [isGridShowMode, setIsGridShowMode] = useState(true);

    useEffect(() => {
        dispatch(getAllProducts({ total: 0, page: 0, limit: 0, category: [], products: [] }))
    }, [])


    return (
        <PageWrapper>
            {isLoadingProducts ? <Loader /> : null}
            <section className="products">
                <aside className="products__filter">
                    <form className="products__filter__form">
                        <section className="products__filter__form__section">
                            <h4>category</h4>
                            <CRadio category="category" radioName="All categories" />
                            {category.map((x: string) => <CRadio category="category" radioName={x} key={x} />)}
                        </section>
                        <section className="products__filter__form__section">
                            <h4>brands</h4>
                            <CRadio category="brands" radioName="All brands" />
                            {brands.map((x: string) => <CRadio category="brands" radioName={x} key={x} />)}
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
                            <CSelectInput />
                        </div>
                    </article>
                    <article className={isGridShowMode ? "products__section__grid" : "products__section__list"}>
                        {
                            isGridShowMode
                                ? products.map((x: any) => <GridProductCard key={x._id} product={x} _id={""} productName={""} image={""} category={""} description={""} price={0} countInStock={0} rating={0} numReviews={0} createdAt={""} updatedAt={""}/>)
                                : null
                        }
                    </article>
                </section>
            </section>
        </PageWrapper>
    )
};

export default Products;
