import { CRadio } from './CRadio';
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../../Redux";
import { Provider } from "react-redux";
import userEvent from '@testing-library/user-event';

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

describe('Testing CAddCartButton content', () => {
    test('Should have one button',()=>{
        renderWithProviders(<CRadio category={''} radioName={''} value={''} defaultChecked={false} />);
        const radio = screen.getByRole('radio');
        expect(radio).toBeInTheDocument;
        // expect(btn).toHaveTextContent('add to cart');
    })
})