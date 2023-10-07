import { CImageModal } from './CImageModal';
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../../Redux";
import { Provider } from "react-redux";
import userEvent from '@testing-library/user-event';

const images = [
    { imageUrl: "https://cdn", _id: "651856f352286409c" },
    { imageUrl: "https://cdn", _id: "651856f352286409c9faf6" },
    { imageUrl: "https://cdn", _id: "651856f36409cbb9faf6" }
]

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

describe('Testing CImageModal content', () => {
    test('Should have 3 icons ,image,counter', () => {
        renderWithProviders(<CImageModal startIndex={0} images={images} closeModal={function (): void { }} />);
        const modal = screen.getByRole('slider');
        expect(modal).toBeInTheDocument;
        const counter = screen.getByText('1 / 3');
        expect(counter).toBeInTheDocument;
        const image = screen.getByRole('img');
        expect(image).toBeInTheDocument;
        const closeSvg = screen.getByTestId('close-svg');
        expect(closeSvg).toBeInTheDocument;
        const rightSvg = screen.getByTestId('go-right-svg');
        expect(rightSvg).toBeInTheDocument;
        const leftSvg = screen.getByTestId('go-left-svg');
        expect(leftSvg).toBeInTheDocument;
    })
})

describe('Testing CImageModal functionality', () => {
    test('close modal', async () => {
        const closeHandler = jest.fn();
        renderWithProviders(<CImageModal startIndex={0} images={images} closeModal={closeHandler} />);
        const modal = screen.getByRole('slider');
        expect(modal).toBeInTheDocument;
        const closeSvg = screen.getByTestId('close-svg');
        await userEvent.click(closeSvg)
        expect(modal).not.toBeInTheDocument;
        await userEvent.click(modal);
        expect(modal).not.toBeInTheDocument;
    })

    test('click left', async () => {
        const goLeftHandler = jest.fn();
        renderWithProviders(<CImageModal startIndex={0} images={images} closeModal={goLeftHandler} />);
        const leftSvg = screen.getByTestId('go-left-svg');
        await userEvent.click(leftSvg);
        expect(goLeftHandler).toBeCalled;
        const counter = screen.getByText('3 / 3');
        expect(counter).toBeInTheDocument;
        await userEvent.click(leftSvg);
        expect(goLeftHandler).toBeCalled;
        const counterTwo = screen.getByText('2 / 3');
        expect(counterTwo).toBeInTheDocument;
        await userEvent.click(leftSvg);
        expect(goLeftHandler).toBeCalled;
        const counterThree = screen.getByText('1 / 3');
        expect(counterThree).toBeInTheDocument;
    })

    test('click right', async () => {
        const goRightHandler = jest.fn();
        renderWithProviders(<CImageModal startIndex={0} images={images} closeModal={goRightHandler} />);
        const rightSvg = screen.getByTestId('go-right-svg');
        await userEvent.click(rightSvg);
        expect(goRightHandler).toBeCalled;
        const counter = screen.getByText('2 / 3');
        expect(counter).toBeInTheDocument;
        await userEvent.click(rightSvg);
        expect(goRightHandler).toBeCalled;
        const counterTwo = screen.getByText('3 / 3');
        expect(counterTwo).toBeInTheDocument;
        await userEvent.click(rightSvg);
        expect(goRightHandler).toBeCalled;
        const counterThree = screen.getByText('1 / 3');
        expect(counterThree).toBeInTheDocument;
    })
})
