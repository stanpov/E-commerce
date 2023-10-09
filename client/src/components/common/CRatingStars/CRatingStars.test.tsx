import { CRatingStars } from './CRatingStars';
import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../../Redux";
import { Provider } from "react-redux";
import { BsStarFill } from 'react-icons/bs';

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

describe('Testing CRatingStars content', () => {
    test('Should be rendered', () => {
        renderWithProviders(<CRatingStars stars={0} />);
        const stars = screen.getByTestId('current-comment-stars');
        expect(stars).toBeInTheDocument;
    })
})
describe('Testing CRatingStars functionality', () => {
    test('Should 5 fill stars', async () => {
        renderWithProviders(<CRatingStars stars={5} />);
        const stars = await screen.getAllByTestId('comment-fill-star');
        expect(stars[0]).toBeInTheDocument();
        expect(stars[1]).toBeInTheDocument();
        expect(stars[2]).toBeInTheDocument();
        expect(stars[3]).toBeInTheDocument();
        expect(stars[4]).toBeInTheDocument();
    })

    test('Should 5 empty stars', async () => {
        renderWithProviders(<CRatingStars stars={0} />);
        const stars = await screen.getAllByTestId('comment-empty-star');
        expect(stars[0]).toBeInTheDocument();
        expect(stars[1]).toBeInTheDocument();
        expect(stars[2]).toBeInTheDocument();
        expect(stars[3]).toBeInTheDocument();
        expect(stars[4]).toBeInTheDocument();
    })

    test('Should 5 empty stars', async () => {
        renderWithProviders(<CRatingStars stars={1.5} />);
        const halfStar = await screen.getByTestId('comment-half-star');
        expect(halfStar).toBeInTheDocument();
    })
})