import { CCountToAdd } from './CCountToAdd';
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

describe('Testing CCountToAdd non countInStock', () => {
    test('Should have count 0 and 2 svg icons disabled',()=>{
        renderWithProviders(<CCountToAdd countInStock={0} count={0} increase={function (): void { } } decrease={function (): void {} } />);
        const count = screen.getByText('0');
        expect(count).toBeInTheDocument;
        const minusSvg = screen.getByTestId('minus-svg');
        expect(minusSvg).toBeInTheDocument;
        expect(minusSvg).toHaveClass('disable__count__button');
        const plusSvg = screen.getByTestId('plus-svg');
        expect(plusSvg).toBeInTheDocument;
        expect(plusSvg).toHaveClass('disable__count__button');
    })

    test('Should have count 2 and plus svg icon NOT disabled',async ()=>{
        renderWithProviders(<CCountToAdd countInStock={5} count={1} increase={function (): void { } } decrease={function (): void {} } />);
        const count = screen.getByText('1');
        expect(count).toBeInTheDocument;
        const minusSvg = screen.getByTestId('minus-svg');
        expect(minusSvg).toBeInTheDocument;
        expect(minusSvg).toHaveClass('disable__count__button');
        const plusSvg = screen.getByTestId('plus-svg');
        expect(plusSvg).toBeInTheDocument;
        expect(plusSvg).toHaveClass('increase__count__button');
    })

    test('Should have minus svg icon NOT disabled',async ()=>{
        renderWithProviders(<CCountToAdd countInStock={5} count={4} increase={function (): void { } } decrease={function (): void {} } />);
        const count = screen.getByText('4');
        expect(count).toBeInTheDocument;
        const minusSvg = screen.getByTestId('minus-svg');
        expect(minusSvg).toBeInTheDocument;
        expect(minusSvg).toHaveClass('decrease__count__button');
    })
})