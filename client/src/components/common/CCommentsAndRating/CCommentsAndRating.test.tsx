import { CCommentsAndRating } from './CCommentsAndRating';
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../../Redux";
import { Provider } from "react-redux";
import { CComment } from '../CComment/CComment';
import { Rating } from '../../../interfaces/interfaces';
import { CLable } from '../CLable/CLable';
import { CAddStarsRadios } from '../CAddStarsRadios/CAddStarsRadios';



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

describe('Testing CCommentsAndRating content', () => {

   

    test('Should be displayed ', () => {
        renderWithProviders(<CCommentsAndRating />);
        const commentsAndRating = screen.getByRole('contentinfo');
        expect(commentsAndRating).toBeInTheDocument;
    })
    test('Should have form with ladle,textarea,title,stars ,and send button ', () => {
        renderWithProviders(<CCommentsAndRating />);
        const form = screen.getByTestId('add-comment-form');
        expect(form).toBeInTheDocument;
        expect(<CLable inputId={'c'} title={'Add Comment & Rating'}/>).toBeInTheDocument;
        const label = screen.getByText('Add Comment & Rating');
        expect(label).toBeInTheDocument;
        const textarea = screen.getByLabelText('Add Comment & Rating');
        expect(textarea).toBeInTheDocument;
        const title = screen.getByText('rate our product here');
        expect(title).toBeInTheDocument;
        expect(<CAddStarsRadios/>).toBeInTheDocument;
        const submitInput = screen.getByText('Send');
        expect(submitInput).toBeInTheDocument;
    })
})