import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../../Redux";
import { Provider } from "react-redux";
import { CInputImage } from "./CInputImage";
import { ChangeEvent } from "react";



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


describe('Test Input content test', () => {
    test('Should have lable , input  and icon', () => {
        renderWithProviders(<CInputImage onChange={function (event: ChangeEvent<HTMLInputElement>): void { }} />);
        const lable = screen.getByRole('profile-image');
        expect(lable).toBeInTheDocument;
        const input = screen.getByLabelText('');
        expect(input).toBeInTheDocument;
        const icon = screen.getByRole('profile-image-icon');
        expect(icon).toBeInTheDocument;
    })
})
describe('Test Input content test functionality', () => {
    test('onChange', async() => {
        const onChange = jest.fn();
        renderWithProviders(<CInputImage onChange={onChange} />);
        const input = screen.getByLabelText('');
        expect(input).toHaveValue('');
        fireEvent.change(input);
        expect(onChange).toBeCalled;
    })
})