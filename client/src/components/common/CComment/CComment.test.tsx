import { CComment } from './CComment';
import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../../Redux";
import { Provider } from "react-redux";
import { Rating } from '../../../interfaces/interfaces';

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

describe('Testing CComment content', () => {
    const currentComment: Rating = {
        userName: 'peter',
        comment: 'nice!',
        rating: 5,
        createdAt: '2023-09-30T17:08:45.391Z',
        id: '123'
    }
    const noStarsComment: Rating = {
        userName: 'peter',
        comment: 'nice!',
        rating: 0,
        createdAt: '2023-09-30T17:08:45.391Z',
        id: '123'
    }


    test('Should have comment, rating,stars, date ,and username', () => {
        renderWithProviders(<CComment comment={currentComment} />);
        const comment = screen.getByRole('article');
        expect(comment).toBeInTheDocument;
        const text = screen.getByText('nice!');
        expect(text).toBeInTheDocument;
        const allRatings = screen.getAllByTestId('current-comment-stars');
        expect(allRatings.length === 5);
        const date = screen.getByText('added on: 30/09/2023');
        expect(date).toBeInTheDocument;
        const user = screen.getByText('peter');
        expect(user).toBeInTheDocument;
    })

    test('Should NOT have stars', () => {
        renderWithProviders(<CComment comment={noStarsComment} />);
        const allRatings = screen.findAllByTestId('current-comment-stars');
        expect(allRatings).not.toBeInTheDocument;
    })
})