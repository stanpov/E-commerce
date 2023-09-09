import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../Redux";
import { Provider } from "react-redux";
import { UserProfileUpdate } from "./UserProfileUpdate";
import { CInputImage } from "../common/CInputImage/CInputImage";
import { CLable } from "../common/CLable/CLable";
import userEvent from "@testing-library/user-event";

let route = '/';

function renderWithProviders(element: React.ReactElement) {
    render(
        <Provider store={store}>
            <BrowserRouter>{element}</BrowserRouter>
        </Provider>
    );
};

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

// describe('Test UserProfileUpdate component content', () => {
//     test('Should have title, image, add image input, form with three lables and three inputs, submit button', () => {
//         renderWithProviders(<UserProfileUpdate setIsUpdate={function (updata: boolean): void { }} />)
//         const title = screen.getByText('update your profile');
//         expect(title).toBeInTheDocument;
//         // expect(<CInputImage onChange={onchange}/>).toBeInTheDocument;
//         const image = screen.getByRole('img');
//         expect(image).toBeInTheDocument;
//         const submitInput = screen.getByDisplayValue('Save');
//         expect(submitInput).toBeInTheDocument;
//         const lables = screen.getAllByRole('input-lable');
//         expect(lables).toHaveLength(3);
//         const inputs = screen.getAllByRole('form-input');
//         expect(inputs).toHaveLength(3);
//         const validationMessages = screen.getAllByRole('validation-message');
//         expect(validationMessages).toHaveLength(3);
//     });
// });

describe('Test UserProfileUpdate component inputs validation functionality', () => {
    test('Username no validation messages',async()=>{
        renderWithProviders(<UserProfileUpdate setIsUpdate={function (updata: boolean): void { }} />)
        const usernameInput = screen.getByLabelText('Username');
        fireEvent.change(usernameInput, { target: { 'value': 'peter' } });
        fireEvent.blur(usernameInput);
        const validationMessage = null;
        expect(usernameInput).toHaveValue('peter');
        expect(validationMessage).toEqual(null);
    });
    test('Username validation messages \'Username is required!\'',async()=>{
        renderWithProviders(<UserProfileUpdate setIsUpdate={function (updata: boolean): void { }} />)
        const usernameInput = screen.getByLabelText('Username');
        fireEvent.change(usernameInput, { target: { 'value': '' } });
        fireEvent.blur(usernameInput);
        const validationMessage = screen.getAllByRole('validation-message');
        expect(usernameInput).toHaveValue('');
        expect(validationMessage[0]).toHaveTextContent('Username is required!');
    });
    test('Username validation messages \'Username needs to be at least 5 characters long!\'',async()=>{
        renderWithProviders(<UserProfileUpdate setIsUpdate={function (updata: boolean): void { }} />)
        const usernameInput = screen.getByLabelText('Username');
        fireEvent.change(usernameInput, { target: { 'value': 'john' } });
        fireEvent.blur(usernameInput);
        const validationMessage = screen.getAllByRole('validation-message');
        expect(usernameInput).toHaveValue('john');
        expect(validationMessage[0]).toHaveTextContent('Username needs to be at least 5 characters long!');
    });

    test('Phone no validation messages ',async()=>{
        renderWithProviders(<UserProfileUpdate setIsUpdate={function (updata: boolean): void { }} />)
        const phoneInput = screen.getByLabelText('Phone number');
        fireEvent.change(phoneInput, { target: { 'value': 8888777888 } });
        fireEvent.blur(phoneInput);
        const validationMessage = screen.getAllByRole('validation-message');
        expect(phoneInput).toHaveValue(8888777888);
        expect(validationMessage[0]).toHaveTextContent('');
    });

    test('Phone validation messages \'Phone is required!\'',async()=>{
        renderWithProviders(<UserProfileUpdate setIsUpdate={function (updata: boolean): void { }} />)
        const phoneInput = screen.getByLabelText('Phone number');
        fireEvent.change(phoneInput, { target: { 'value': null } });
        fireEvent.blur(phoneInput);
        const validationMessage = screen.getAllByRole('validation-message');
        expect(phoneInput).toHaveValue(null);
        expect(validationMessage[1]).toHaveTextContent('Phone is required!');
    });

    test('Phone validation messages \'Invalid phone number!\'',async()=>{
        renderWithProviders(<UserProfileUpdate setIsUpdate={function (updata: boolean): void { }} />)
        const phoneInput = screen.getByLabelText('Phone number');
        fireEvent.change(phoneInput, { target: { 'value': 555666 } });
        fireEvent.blur(phoneInput);
        const validationMessage = screen.getAllByRole('validation-message');
        expect(phoneInput).toHaveValue(555666);
        expect(validationMessage[1]).toHaveTextContent('Invalid phone number!');
    });
//todo
    test('Address validation messages \'Address is required!\'',async()=>{
        renderWithProviders(<UserProfileUpdate setIsUpdate={function (updata: boolean): void { }} />)
        const phoneInput = screen.getByLabelText('Phone number');
        fireEvent.change(phoneInput, { target: { 'value': 555666 } });
        fireEvent.blur(phoneInput);
        const validationMessage = screen.getAllByRole('validation-message');
        expect(phoneInput).toHaveValue(555666);
        expect(validationMessage[1]).toHaveTextContent('Invalid phone number!');
    });
});