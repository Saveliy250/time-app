import {render, screen, waitFor} from "@testing-library/react";
import {Register} from "./Register";
import userEvent from '@testing-library/user-event';
import type {IUser} from "entities/user/IUser.ts";

import {useAppDispatch, useAppSelector} from "shared/hooks/redux.ts";
import {registerUser} from "entities/user/UserSlice.ts";
import {MantineProvider} from "@mantine/core";
import {BrowserRouter} from "react-router-dom";

jest.mock('shared/hooks/redux.ts', () => ({
    useAppDispatch: jest.fn(),
    useAppSelector: jest.fn(),
}))

jest.mock('entities/user/UserSlice.ts', () => ({
    registerUser: jest.fn((data: IUser) => ({type: 'REGISTER_USER', payload: data})),
}))

const useAppDispatchMock = useAppDispatch as jest.MockedFunction<typeof useAppDispatch>;
const useAppSelectorMock = useAppSelector as jest.MockedFunction<typeof useAppSelector>;
const mockDispatch = jest.fn();

describe('Register', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        useAppDispatchMock.mockReturnValue(mockDispatch);
        useAppSelectorMock.mockReturnValue({isError: false, isLoading: false});
    })

    test('проверка введенных данных', async () => {
        render(
            <BrowserRouter>
                <MantineProvider>
                    <Register/>
                </MantineProvider>
            </BrowserRouter>
        );

        const nameInput = screen.getByLabelText('Name')
        const emailInput = screen.getByLabelText('Email')
        const passwordInput = screen.getByLabelText('Password')
        const submitButton = screen.getByRole('button');

        await userEvent.type(nameInput, 'TestName')
        await userEvent.type(emailInput, 'TestEmail')
        await userEvent.type(passwordInput, 'TestPassword')

        await userEvent.click(submitButton)

        await waitFor(() => {
            expect(registerUser).toBeCalledWith({
                name: 'TestName',
                email: 'TestEmail',
                password: 'TestPassword',
            })
            expect(mockDispatch).toHaveBeenCalled()
        })

    })
})