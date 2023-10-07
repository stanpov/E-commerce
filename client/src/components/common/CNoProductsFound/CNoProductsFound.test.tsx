import { CNoProductsFound } from './CNoProductsFound';
import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../../Redux";
import { Provider } from "react-redux";

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

describe('Testing CNoProductsFound', () => {
    test('Content',()=>{
        renderWithProviders(<CNoProductsFound />);
        const message = screen.getByRole('contentinfo');
        expect(message).toBeInTheDocument;
        const image = screen.getByRole('img');
        expect(image).toBeInTheDocument;
    })
})
