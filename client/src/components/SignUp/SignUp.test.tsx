import React from "react";
import { Provider } from "react-redux";
import { store } from "../../Redux";
import { BrowserRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { SignUp } from "./SignUp";
import userEvent from "@testing-library/user-event";
import { Home } from "../../pages/Home/Home";

let route = "/";

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

beforeEach(() => {
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
        observe: () => null,
        unobserve: () => null,
        disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
    return route;
});

afterEach(() => {
    jest.clearAllMocks();
    return route;
});

describe('Test SignUp component content', () => {

    test('Should have one form', () => {
        renderWithProviders(<SignUp />);
        const formElement = screen.getByTestId('sign__up__form');
        expect(formElement).toBeInTheDocument();
    });

    test('Should have one title', () => {
        renderWithProviders(<SignUp />);
        const signUpTitle = screen.getByDisplayValue('Sign Up');
        expect(signUpTitle).toBeInTheDocument();
    });

    test('Should have four inputs', () => {
        renderWithProviders(<SignUp />);
        const formElements = screen.getAllByRole('form-input');
        expect(formElements).toHaveLength(3);
    });

    test('Should have one Submit button', () => {
        renderWithProviders(<SignUp />);
        const formElements = screen.getByRole('submit-input');
        expect(formElements).toBeInTheDocument();
    });
})

describe('Testing SignUp submit functionality', () => {

    test('On click SignUp if form inputs are empty should stay in SignUp page', async () => {
        const user = userEvent;
        renderWithProviders(<SignUp />);
        await user.click(screen.getByRole('submit-input'));
        expect(<SignUp />).toBeInTheDocument;
    });

    test('On click SignUp needs to go to Home Page', async () => {
        const user = userEvent;
        renderWithProviders(<SignUp />);
        const username = screen.getByLabelText('Username');
        fireEvent.change(username, { 'target': { 'value': 'peter' } });
        const password = screen.getByLabelText('Password');
        fireEvent.change(password, { 'target': { 'value': '123456' } });
        const email = screen.getByLabelText('Email');
        fireEvent.change(email, { 'target': { 'value': 'peter@abv.bg' } });
        expect(username).toHaveValue('peter')
        expect(password).toHaveValue('123456')
        expect(email).toHaveValue('peter@abv.bg')
        await user.click(screen.getByRole('submit-input'));
        expect(<Home />).toBeInTheDocument;
    });

    test('On click SignUp with empty email input should stay in SignUp', async () => {
        const user = userEvent;
        renderWithProviders(<SignUp />);
        const username = screen.getByLabelText('Username');
        fireEvent.change(username, { 'target': { 'value': 'peter' } });
        const password = screen.getByLabelText('Password');
        fireEvent.change(password, { 'target': { 'value': '123456' } });
        const email = screen.getByLabelText('Email');
        expect(username).toHaveValue('peter')
        expect(password).toHaveValue('123456')
        expect(email).toHaveValue('')
        await user.click(screen.getByRole('submit-input'));
        expect(<SignUp />).toBeInTheDocument;
    });

    test('On click SignUp with empty password input should stay in SignUp', async () => {
        const user = userEvent;
        renderWithProviders(<SignUp />);
        const username = screen.getByLabelText('Username');
        fireEvent.change(username, { 'target': { 'value': 'peter' } });
        const password = screen.getByLabelText('Password');
        const email = screen.getByLabelText('Email');
        fireEvent.change(email, { 'target': { 'value': 'peter@abv.bg' } });
        expect(username).toHaveValue('peter')
        expect(password).toHaveValue('')
        expect(email).toHaveValue('peter@abv.bg')
        await user.click(screen.getByRole('submit-input'));
        expect(<SignUp />).toBeInTheDocument;
    });

    test('On click SignUp with empty username input should stay in SignUp', async () => {
        const user = userEvent;
        renderWithProviders(<SignUp />);
        const username = screen.getByLabelText('Username');
        const password = screen.getByLabelText('Password');
        fireEvent.change(password, { 'target': { 'value': '123456' } });
        const email = screen.getByLabelText('Email');
        fireEvent.change(email, { 'target': { 'value': 'peter@abv.bg' } });
        expect(username).toHaveValue('')
        expect(password).toHaveValue('123456')
        expect(email).toHaveValue('peter@abv.bg')
        await user.click(screen.getByRole('submit-input'));
        expect(<SignUp />).toBeInTheDocument;
    });
});

describe('Testing SignUp validation messages functionality', () => {
    test('Empty username input should have one validation message', async () => {
        renderWithProviders(<SignUp />);
        const username = screen.getByLabelText('Username');
        fireEvent.blur(username);
        const validationMessages = screen.getAllByRole('validation-message');
        const validationMessage = screen.getByRole('validation-message');
        expect(validationMessages).toHaveLength(1);
        expect(validationMessage).toHaveTextContent('Username is required!');
    });

    test('Username under five characters should validation message', async () => {
        renderWithProviders(<SignUp />);
        const username = screen.getByLabelText('Username');
        fireEvent.change(username, { 'target': { value: 'john' } })
        fireEvent.blur(username);
        const validationMessage = screen.getByRole('validation-message');
        expect(validationMessage).toHaveTextContent('Username needs to be at least 5 characters long!');
    });

    test('Empty password input should have one validation message', async () => {
        renderWithProviders(<SignUp />);
        const password = screen.getByLabelText('Password');
        fireEvent.blur(password);
        const validationMessage = screen.getAllByRole('validation-message');
        expect(validationMessage).toHaveLength(1);
        expect(validationMessage[0]).toHaveTextContent('Password is required!');
    });

    test('Password input should have more than four characters', async () => {
        renderWithProviders(<SignUp />);
        const password = screen.getByLabelText('Password');
        fireEvent.change(password, { 'target': { value: '111' } });
        fireEvent.blur(password);
        const validationMessage = screen.getAllByRole('validation-message');
        expect(validationMessage).toHaveLength(1);
        expect(validationMessage[0]).toHaveTextContent('Password needs to be at least 5 characters long!');
    });

    test('Empty email input should have one validation message', async () => {
        renderWithProviders(<SignUp />);
        const email = screen.getByLabelText('Email');
        fireEvent.blur(email);
        const validationMessage = screen.getAllByRole('validation-message');
        expect(validationMessage).toHaveLength(1);
        expect(validationMessage[0]).toHaveTextContent('Email is required!');
    });

    test('Wrong email input should have validation message', async () => {
        renderWithProviders(<SignUp />);
        const email = screen.getByLabelText('Email');
        fireEvent.change(email, { 'target': { value: 'john@abv' } });
        fireEvent.blur(email);
        const validationMessage = screen.getByRole('validation-message');
        expect(validationMessage).toHaveTextContent('Invalid email!');
    });

    test('All inputs are empty should have three validation messages', async () => {
        renderWithProviders(<SignUp />);
        const username = screen.getByLabelText('Username');
        fireEvent.blur(username);
        const password = screen.getByLabelText('Password');
        fireEvent.blur(password);
        const email = screen.getByLabelText('Email');
        fireEvent.blur(email);
        const validationMessage = screen.getAllByRole('validation-message');
        expect(validationMessage).toHaveLength(3);
    });

    test('All inputs are valid should not have validation messages', async () => {
        renderWithProviders(<SignUp />);
        const username = screen.getByLabelText('Username');
        fireEvent.change(username, { 'target': { value: 'george' } });
        fireEvent.blur(username);
        const password = screen.getByLabelText('Password');
        fireEvent.change(password, { 'target': { value: '123456' } });
        fireEvent.blur(password);
        const email = screen.getByLabelText('Email');
        fireEvent.change(email, { 'target': { value: 'john@gmail.com' } });
        fireEvent.blur(email);
        const validationMessage = null;
        expect(validationMessage).toEqual(null);
    });
})

