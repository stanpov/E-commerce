import { CSelectInput } from './CSelectInput';
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

describe('Testing CSelectInput content', () => {
    test('Should have select input with five options', () => {
        renderWithProviders(<CSelectInput />);
        const select = screen.getByLabelText('sort');
        expect(select).toBeInTheDocument;
        const options = screen.getAllByRole('option');
        expect(options).toHaveLength(5);
    })
})
describe('Testing CSelectInput functionality', () => {
    test('Should change initial value', async () => {
        const selectOption = jest.fn();
        renderWithProviders(<CSelectInput />);
        const select = await screen.getByLabelText('sort');
        const option = await screen.getByRole('combobox');
        await userEvent.selectOptions(option,'price')
        expect(select).toHaveValue('price')
        await userEvent.selectOptions(option,'productName,1')
        expect(select).toHaveValue('productName,1')
    })
})
