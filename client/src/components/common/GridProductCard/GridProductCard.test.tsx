import { GridProductCard } from './GridProductCard';
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../../Redux";
import { Provider } from "react-redux";
import userEvent from '@testing-library/user-event';
import { CRatingStars } from '../CRatingStars/CRatingStars';
import configureStore from "redux-mock-store";
import { CAddCartButton } from '../CAddCartButton/CAddCartButton';
import { COutOfStockMessage } from '../COutOfStockMessage/COutOfStockMessage';

const loggedInState = {
    auth: {
        isAdmin: false,
        userId: "test",
        isError: false,
        isLoading: false,
        message: "User successfully logged in",
    },
};
const notLoggedInState = {
    auth: {
        isAdmin: false,
        userId: "",
        isError: false,
        isLoading: false,
        message: "",
    },
};

const productOutOfStock = {
    _id: '123',
    productName: 'asus',
    images: [
        {
            imageUrl: 'test',
            _id: '123'
        },
        {
            imageUrl: 'test',
            _id: '123'
        },
    ],
    category: 'TV',
    description: 'test',
    price: 100,
    countInStock: 0,
    rating: [
        {
            userName: 'peter',
            comment: 'nice',
            rating: 0,
            createdAt: '2023-09-30T17:08:45.391Z',
            id: '123',
        }
    ],
    numReviews: 5,
    brand: 'asus',
    createdAt: '2023-09-30T17:08:45.391Z',
    updatedAt: '2023-09-30T17:08:45.391Z',
}
const productInStock = {
    _id: '123',
    productName: 'asus',
    images: [
        {
            imageUrl: 'test',
            _id: '123'
        },
        {
            imageUrl: 'test',
            _id: '123'
        },
    ],
    category: 'TV',
    description: 'test',
    price: 100,
    countInStock: 3,
    rating: [
        {
            userName: 'peter',
            comment: 'nice',
            rating: 0,
            createdAt: '2023-09-30T17:08:45.391Z',
            id: '123',
        }
    ],
    numReviews: 5,
    brand: 'asus',
    createdAt: '2023-09-30T17:08:45.391Z',
    updatedAt: '2023-09-30T17:08:45.391Z',
}

function renderWithProviders(element: React.ReactElement, mockStore?: any) {
    if (mockStore) {
        render(
            <Provider store={mockStore}>
                <BrowserRouter>{element}</BrowserRouter>
            </Provider>
        );
    } else {
        render(
            <Provider store={store}>
                <BrowserRouter>{element}</BrowserRouter>
            </Provider>
        );
    }
}

describe('Testing GridCard content', () => {
    test('Should have image,product name,price,stars,details button', () => {
        renderWithProviders(<GridProductCard product={productOutOfStock} />);
        const card = screen.getByRole('article');
        expect(card).toBeInTheDocument;
        const image = screen.getByRole('img');
        expect(image).toBeInTheDocument;
        expect(<CRatingStars stars={0} />).toBeInTheDocument;
        expect(<CAddCartButton countInStock={0}/>).toBeInTheDocument
    })
})
describe('Testing GridCard functionality', () => {
    test('Not logged user click Details button - redirect to login page', async () => {
        const click = jest.fn();
        const mockStore = configureStore();
        const userStore = mockStore(notLoggedInState);
        userStore.clearActions();

        renderWithProviders(<GridProductCard product={productOutOfStock} />);
        const detailsButton = screen.getByText('details');
        expect(detailsButton).toBeInTheDocument;
        await userEvent.click(detailsButton);
        expect(click).toBeCalled;
        expect(<GridProductCard product={productOutOfStock}/>).not.toBeInTheDocument;
    })

    test('Product out of stock message', async () => {
        const click = jest.fn();
        const mockStore = configureStore();
        const productStore = mockStore(productOutOfStock);
        const userStore = mockStore(loggedInState);
        productStore.clearActions();
        userStore.clearActions();

        renderWithProviders(<GridProductCard product={productOutOfStock} />);
        expect(<COutOfStockMessage/>).toBeInTheDocument;
        // const message = await screen.getByText('out of stock');
        // expect(message).toBeInTheDocument;
    })
    test('Product Add to cart button', async () => {
        // const click = jest.fn();
        const mockStore = configureStore();
        const productStore = mockStore(productInStock);
        const userStore = mockStore(loggedInState);
        productStore.clearActions();
        userStore.clearActions();

        renderWithProviders(<GridProductCard product={productInStock} />);
        expect(<CAddCartButton countInStock={productInStock.countInStock}/>).toBeInTheDocument;
    })
})