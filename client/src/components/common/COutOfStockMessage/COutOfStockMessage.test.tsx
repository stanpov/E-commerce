import { AiOutlineStop } from 'react-icons/ai';
import { COutOfStockMessage } from './COutOfStockMessage';
import {  render, screen } from "@testing-library/react";
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../../Redux';
import configureStore from "redux-mock-store";

const notLoggedInState = {
    auth: {
      isAdmin: false,
      userId: "",
      isError: false,
      isLoading: false,
      message: "",
    },
  };

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


describe('Testing COutOfStockMessage', () => {
    test('To be rendered',()=>{
        renderWithProviders(<COutOfStockMessage/>);
        const message = screen.getByText('out of stock');
        expect(message).toBeInTheDocument;
        expect(message).toHaveTextContent('out of stock')
        expect(<AiOutlineStop/>).toBeInTheDocument;
    })
 
    test('not to be rendered',async()=>{
        const mockStore = configureStore();
        const userStore = mockStore(notLoggedInState);
        userStore.clearActions();

        renderWithProviders(<COutOfStockMessage/>,userStore);
        expect(<COutOfStockMessage/>).not.toBeInTheDocument;
        
    })
})
