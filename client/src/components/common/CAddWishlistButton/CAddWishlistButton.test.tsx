import { CAddWishlistButton } from './CAddWishlistButton';
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../../Redux";
import { Provider } from "react-redux";
import userEvent from '@testing-library/user-event';


let route = "/";

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

describe('Testing CAddWishlistButton content', () => {
    test('Should have one button',()=>{
        renderWithProviders(< CAddWishlistButton />);
        const btn = screen.getByRole('button');
        expect(btn).toBeInTheDocument;
        expect(btn).toHaveTextContent('added to wishlist');
        fireEvent.click(btn);
        const btns = screen.getByRole('button');
        expect(btn).toBeInTheDocument;
        expect(btns).toHaveTextContent('add to wishlist')
    })
})

describe('Testing CAddWishlistButton onClick', () => {
    test('Should change button text content',()=>{
        renderWithProviders(< CAddWishlistButton />);
        const btn = screen.getByRole('button');
        expect(btn).toBeInTheDocument;
        expect(btn).toHaveTextContent('added to wishlist');
        fireEvent.click(btn);
        const btns = screen.getByRole('button');
        expect(btn).toBeInTheDocument;
        expect(btns).toHaveTextContent('add to wishlist')
    })
})

