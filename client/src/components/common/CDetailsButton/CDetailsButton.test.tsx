import { CDetailsButton } from './CDetailsButton';
import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../../Redux";
import { Provider } from "react-redux";
import userEvent from '@testing-library/user-event';
import { BsInfoSquare } from 'react-icons/bs';
import configureStore from "redux-mock-store";

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
    test('Display button onClick', async () => {
        const mockState = configureStore();
        const userStote = mockState(userState);
        userStote.clearActions();
        const axios = require('axios');
        jest.mock('axios');
        axios.get('www.google.com');
        

        renderWithProviders(<CDetailsButton productId={''} />);
        const btn = await screen.getByRole('button');
        await userEvent.click(btn);
        expect(<CDetailsButton productId={''}/>).not.toBeInTheDocument;
        expect(axios.get).toHaveBeenCalledTimes(1);
    })
})

