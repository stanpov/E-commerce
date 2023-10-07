import { CNoCommentsMessage } from './CNoCommentsMessage';
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
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

describe('Testing CNoCommentsMesssage content', () => {
    test('Should have text and icon', () => {
        renderWithProviders(<CNoCommentsMessage />);
        const message = screen.getByTestId('no-comments-message');
        expect(message).toBeInTheDocument;
    })
})