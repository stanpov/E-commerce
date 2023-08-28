import {  render, screen ,fireEvent} from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";
import { store } from "../../../Redux";
import { Provider } from "react-redux";
import { CInput } from "./CInput";


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

describe("Testing the CInput content", () => {
    test("Should be in the document", () => {
      renderWithProviders(<CInput type={"number"} name={""} id={""} placeholder={""} value={''} />);
      const inputElement = screen.getByTestId("form-input");
      expect(inputElement).toBeInTheDocument();
    });

    test("Should have value", () => {
      renderWithProviders(<CInput type={"number"} name={""} id={""} placeholder={""} value={7584} />);
      const inputElement = screen.getByTestId("form-input");
      expect(inputElement).toHaveValue(7584);
    });

});

describe("Enter data onBlur",()=>{
    test('handle onBlur event value', () =>{
        const onBlur = jest.fn();
        renderWithProviders(<CInput onBlur={onBlur} type={"number"} name={""} id={""} placeholder={""} value={'5555'}/>)
        const inputElement = screen.getByTestId('form-input');
        fireEvent.blur(inputElement);
        expect(inputElement).toHaveValue(5555);
        expect(onBlur).toHaveBeenCalledTimes(1);
    })
    test('handle onBlur event time calls', () =>{
        const onBlur = jest.fn();
        renderWithProviders(<CInput onBlur={onBlur} type={"number"} name={""} id={""} placeholder={""} value={''}/>)
        const inputElement = screen.getByTestId('form-input');
        fireEvent.blur(inputElement);
        expect(onBlur).toHaveBeenCalledTimes(1);
    })
})