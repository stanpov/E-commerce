import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { CAddCartButton } from "./CAddCartButton";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../../Redux";
import { Provider } from "react-redux";

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

describe('Testing CAddCartButton content', () => {
    test('Should have one button',()=>{
        renderWithProviders(<CAddCartButton/>);
        const btn = screen.getByRole('button');
        expect(btn).toBeInTheDocument;
        expect(btn).toHaveTextContent('add to cart');
    })
})