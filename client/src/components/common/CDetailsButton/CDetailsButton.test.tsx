import { CDetailsButton } from './CDetailsButton';
import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../../Redux";
import { Provider } from "react-redux";
import userEvent from '@testing-library/user-event';
import { BsInfoSquare } from 'react-icons/bs';
import configureStore from "redux-mock-store";
import { ProductDetails } from '../../../pages/ProductDetails/ProductDetails';
import { LoginSignUp } from '../../../pages/LoginSignUp/LoginSignUp';

let route = '/';
const userState = {
    auth: {
        isAdmin: false,
        userId: 'testid123456123456123456',
        isError: false,
        isLoading: false,
        message: "User successfully logged in",
        isVerified: true,
    }
}
const noUserState = {
    auth: {
        isAdmin: false,
        userId: '',
        isError: false,
        isLoading: false,
        message: '',
        isVerified: false,
    }
}

const product = {
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
    countInStock: 2,
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

beforeEach(() => {
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
        observe: () => null,
        unobserve: () => null,
        disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
    return route;
});

afterEach(() => {
    jest.clearAllMocks();
    return route;
});

describe('Testing CDetailsButton', () => {
    test('Button content', () => {
        renderWithProviders(<CDetailsButton productId={''} />);
        const btn = screen.getByRole('button');
        expect(btn).toBeInTheDocument;
        expect(btn).toHaveTextContent('details');
        expect(<BsInfoSquare />).toBeInTheDocument;
    })
})

describe('Testing CDetailsButton functionality', () => {
    test('Logged in user click details button', async () => {
        const onClick = jest.fn();
        const mockState = configureStore();
        const userStote = mockState(userState);
        userStote.clearActions();

        renderWithProviders(<CDetailsButton productId={product._id} />);
        const btn = await screen.getByRole('button');
        await userEvent.click(btn);
        expect(<ProductDetails/>).toBeInTheDocument;
        expect(btn).not.toBeInTheDocument;
    })
    test('NOT Logged in user click details button', async () => {
        const onClick = jest.fn();
        const mockState = configureStore();
        const userStote = mockState(noUserState);
        userStote.clearActions();

        renderWithProviders(<CDetailsButton productId={product._id} />);
        const btn = await screen.getByRole('button');
        await userEvent.click(btn);
        expect(<LoginSignUp/>).toBeInTheDocument;
        expect(btn).not.toBeInTheDocument;
    })
})

