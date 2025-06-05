import {Button, TextInput} from "@mantine/core";
import {Link} from "react-router-dom";
import {type SubmitHandler, useForm} from "react-hook-form";
import type {IUser} from "entities/user/IUser.ts";
import {useAppDispatch, useAppSelector} from "shared/hooks/redux.ts";
import {ROUTES} from "shared/routes.ts";
import {loginUser} from "entities/user/UserSlice.ts";

export const Login = () => {

    const {register, handleSubmit, formState: {errors}} = useForm<IUser>()

    const dispatch = useAppDispatch()
    const {isLoading, isError} = useAppSelector(state => state.user)

    const onSubmit: SubmitHandler<IUser> = (data) => {
        dispatch(loginUser(data))
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextInput
                    label="Email"
                    placeholder="Email"
                    {...register('email', {required: true})}
                />
                <TextInput
                    mt="md"
                    label="Password"
                    placeholder="Password"
                    {...register('password', {required: true})}
                />

                <Button type={"submit"} loading={isLoading}>
                    Login
                </Button>
                {errors.email && <span>{isError}</span>}
                <Link to={ROUTES.REGISTRATION}>Регистрация</Link>

            </form>
        </>
    );
};