import { CSearchInput } from './CSearchInput';
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../../Redux";
import { Provider } from "react-redux";
import userEvent from '@testing-library/user-event';
import { BsSearch } from 'react-icons/bs';


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

describe('Testing CSearchInput content', () => {
    test('Should have form with icon, input, and button ', () => {
        renderWithProviders(<CSearchInput />);
        const form = screen.getByRole('form');
        expect(form).toBeInTheDocument;
        expect(<BsSearch />).toBeInTheDocument;
        const input = screen.getAllByLabelText('');
        expect(input).toBeInTheDocument;
        const submit = screen.getByText('Search');
        expect(submit).toBeInTheDocument;
    })
})
describe('Testing CSearchInput functionality', () => {
    test('Click Search button', async () => {
        const clickSubmit = jest.fn();
        renderWithProviders(<CSearchInput />);
        const submit = await screen.getByText('Search');
        fireEvent.click(submit);
        expect(clickSubmit).toBeCalled;
    })
    test('Change input value', async () => {
        const onChange = jest.fn();
        renderWithProviders(<CSearchInput />);
        const input = await screen.getByLabelText('');
        fireEvent.change(input, { 'target': { 'value': 'asus' } });
        expect(onChange).toBeCalled;
        expect(input).toHaveValue('asus');
    })
})