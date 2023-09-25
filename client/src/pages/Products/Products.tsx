import React, { useEffect, useState } from "react";
import { CRadio } from "../../components/common/CRadio/CRadio";
import { FaList } from "react-icons/fa";
import { BsFillGridFill } from "react-icons/bs";
import { CSearchInput } from "../../components/common/CSearchInput/CSearchInput";
import { CSelectInput } from "../../components/common/CSelectInput/CSelectInput";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { getAllProducts, getFilterProducts } from "../../Redux/Products/ProductsActions";
import { allProducts, brand, categories, isLoading } from "../../Redux/Products/ProductSlice";
import { Loader } from "../../components/common/Loader/Loader";
import { GridProductCard } from "../../components/common/GridProductCard/GridProductCard";
import { ListProductCard } from "../../components/common/ListProductCard/ListProductCard";
import { CInputSubmit } from "../../components/common/CInputSubmit/CInputSubmit";
import './Products.scss';
import { FilterProducts, Product } from "../../interfaces/interfaces";

interface ProductsProps {

}

const Products: React.FC<ProductsProps> = () => {

    const dispatch = useAppDispatch();
    const category = useAppSelector(categories);
    const products = useAppSelector(allProducts);
    const brands = useAppSelector(brand);
    const isLoadingProducts = useAppSelector(isLoading);
    const [isGridShowMode, setIsGridShowMode] = useState(true);
    const [filterData, setFilterData] = useState<FilterProducts>({category:'',brand:'',sort:''});

    useEffect(() => {
        dispatch(getAllProducts({
            total: 0, page: 0, limit: 0, category: [], products: [], brand: []
        }))
    }, []);

    const setShowMode = () => {
        setIsGridShowMode(!isGridShowMode);
    };

    const filterHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        let category = formData.get('category')?.toString();
        let brand = formData.get('brand')?.toString();
        let sort = formData.get('sortBy')?.toString();

        let filterData = {
            category: category ? category : '',
            brand:brand ? brand : '',
            sort:sort
        }
        
        dispatch(getFilterProducts(filterData));
        // console.log(filterData);
                

    }


    return (
        <div className="products__wrapper">
            {isLoadingProducts ? <Loader /> : null}
            <section className="products">
                <aside className="products__filter">
                    <form onSubmit={filterHandler} className="products__filter__form">
                        <section className="products__filter__form__section">
                            <h4>category</h4>
                            <CRadio category="category" radioName="All"  value='' defaultChecked={true}/>
                            {category.map((x: string) => <CRadio category="category" radioName={x} key={x} value={x} defaultChecked={false} />)}
                        </section>
                        <section className="products__filter__form__section">
                            <h4>brands</h4>
                            <CRadio category="brand" radioName="All brands" value="" defaultChecked={true}/>
                            {brands.map((x: string) => <CRadio category="brand" radioName={x} key={x} value={x} defaultChecked={false}/>)}
                        </section>
                        <section className="products__filter__form__section">
                            <CSelectInput />
                        </section>
                        <section className="products__filter__form__submit">
                            <CInputSubmit value={"filter"} />
                        </section>

                    </form>
                    <p className="products__filter__form__hidden">filter</p>
                </aside>
                <section className="products__section">
                    <article className="products__section__sorter">
                        <div className="products__section__sorter__icons">
                            <BsFillGridFill onClick={setShowMode} className={isGridShowMode ? "active__show__mode" : undefined} />
                            <FaList onClick={setShowMode} className={!isGridShowMode ? "active__show__mode" : undefined} />
                        </div>
                        <div className="products__section__sorter__search">
                            <CSearchInput />
                        </div>

                    </article>
                    <article className={isGridShowMode ? "products__section__grid" : "products__section__list"}>
                        {
                            isGridShowMode
                                ? products.map((x: Product) => <GridProductCard key={x._id} product={x} />)
                                : products.map((x: Product) => <ListProductCard key={x._id} product={x} />)
                        }
                    </article>
                </section>
            </section>
        </div>
    )
};

export default Products;
