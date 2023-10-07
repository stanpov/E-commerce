import { CCommentsAndRating } from './CCommentsAndRating';
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../../Redux";
import { Provider } from "react-redux";
import { CLable } from '../CLabel/CLabel';
import { CAddStarsRadios } from '../CAddStarsRadios/CAddStarsRadios';
import userEvent from '@testing-library/user-event';
import configureStore from "redux-mock-store";

const productState = {
    singleProduct: {
        isLoading: false,
        isError: false,
        _id: '123',
        productName: 'sony',
        images: [
            {
                imageUrl: "https://cdn.dxomark.com/wp-content/uploads/medias/post-147160/Huawei-P60-Pro_featured-image-packshot-review-Recovered.jpg",
                _id: "651856f352286409cbb9faf6"
            }
        ],
        category: 'TV',
        description: 'TV',
        price: 100,
        countInStock: 0,
        rating: [
            {
                userName: 'peter',
                comment: 'nice',
                rating: 5,
                createdAt: '',
                id: '123',
            }
        ],
        numReviews: 0,
        brand: 'sony',
        createdAt: '',
        updatedAt: '',
        message: '',
    }
}


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
        expect(<CLable inputId={'c'} title={'Add Comment & Rating'} />).toBeInTheDocument;
        const label = screen.getByText('Add Comment & Rating');
        expect(label).toBeInTheDocument;
        const textarea = screen.getByLabelText('Add Comment & Rating');
        expect(textarea).toBeInTheDocument;
        const title = screen.getByText('rate our product here');
        expect(title).toBeInTheDocument;
        expect(<CAddStarsRadios />).toBeInTheDocument;
        const submitInput = screen.getByText('Send');
        expect(submitInput).toBeInTheDocument;
    })
})

describe('Testing CCommentsAndRating form', () => {
    test('Textarea textcontent', async () => {
        renderWithProviders(<CCommentsAndRating />);
        const textarea = screen.getByLabelText('Add Comment & Rating');
        fireEvent.change(textarea, { 'target': { 'textContent': 'nice one' } });
        expect(textarea).toHaveTextContent('nice one');
        const stars = screen.getAllByTestId('stars-icons');
        expect(stars).toHaveLength(5);
        userEvent.click(stars[2]);
        const starsCount = screen.getByTestId('3');
        expect(starsCount).toBeChecked;
    })
})

describe('Testing CCommentsAndRating ', () => {
    test('Show comments', async () => {
        const mockStore = configureStore();
        const productStore = mockStore(productState);
        productStore.clearActions();

        renderWithProviders(<CCommentsAndRating />, productStore);
        const comments = await screen.getAllByTestId('single-comment');
        expect(comments).toHaveLength(1)

    })
})

describe('Testing CCommentsAndRating functionality', () => {
    test('Form submit', async () => {
        renderWithProviders(<CCommentsAndRating />);
        const submitButton = screen.getByText('Send');
        expect(submitButton).toBeInTheDocument;
        //TODO test with api call
    })
})