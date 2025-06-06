import {Button, TextInput} from "@mantine/core";
import {type SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "shared/hooks/redux.ts";
import type {IUser} from "entities/user/IUser.ts";
import {Link} from "react-router-dom";
import {registerUser} from "entities/user/UserSlice.ts";

export const Register = () => {

    const {register, handleSubmit, formState: {errors}} = useForm<IUser>()

    const dispatch = useAppDispatch()
    const {isError, isLoading} = useAppSelector(state => state.user)

    const onSubmit: SubmitHandler<IUser> = (data) => {
        dispatch(registerUser(data))
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextInput
                    label="Name"
                    placeholder="Name"
                    {...register('name', {required: true})}
                />
                <TextInput
                    label="Email"
                    placeholder="Email"
                    {...register('email')}
                />
                <TextInput
                    mt="md"
                    label="Password"
                    placeholder="Password"
                    {...register('password')}
                />
                {errors.name && <span>{isError}</span>}
                <Button type={"submit"} loading={isLoading}>
                    Зарегистрироваться
                </Button>
            </form>
            <Link to={'/login'}>Войти</Link>
        </>
    );
};