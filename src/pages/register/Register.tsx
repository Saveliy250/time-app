import {Button, TextInput} from "@mantine/core";
import {type SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../shared/hooks/redux.ts";
import type {IUser} from "../../entities/auth/IUser.ts";
import {registerUser} from "../../shared/store/ActionCreator.ts";
import {Link} from "react-router-dom";

export const Register = () => {

    const {register, handleSubmit, formState: {errors}} = useForm<IUser>()

    const dispatch = useAppDispatch()
    const {error, loading , token} = useAppSelector(state => state.user)

    const onSubmit: SubmitHandler<IUser> = (data) => {
        dispatch(registerUser(data))
        console.log(token)
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
                {errors.name && <span>{error}</span>}
                <Button type={"submit"} loading={loading}>
                    Зарегистрироваться
                </Button>
            </form>
            <Link to={'/login'}>Войти</Link>
        </>
    );
};