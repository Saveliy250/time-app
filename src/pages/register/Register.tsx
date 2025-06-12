import {Button, TextInput} from "@mantine/core";
import {type SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "shared/hooks/redux.ts";
import type {IUser} from "entities/user/IUser.ts";
import {Link, useNavigate} from "react-router-dom";
import {registerUser} from "entities/user/UserSlice.ts";
import {notifications} from "@mantine/notifications";
import classes from "./Register.module.css";
import {ROUTES} from "shared/routes.ts";

export const Register = () => {

    const {register, handleSubmit} = useForm<IUser>()
    const navigate = useNavigate();

    const dispatch = useAppDispatch()
    const { isLoading, error} = useAppSelector(state => state.user)

    const onSubmit: SubmitHandler<IUser> = async (data) => {
        try {
            await dispatch(registerUser(data)).unwrap()
            navigate(ROUTES.PROFILE)
        } catch {
            notifications.show({
                color: 'red',
                title: 'Something went wrong :( ',
                message: error,
            })
        }
    }


    return (
        <div className={classes.registerFormWrapper}>
            <form onSubmit={handleSubmit(onSubmit)} >
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
                <Button type={"submit"} loading={isLoading}>
                    Зарегистрироваться
                </Button>
            </form>
            <Link to={'/login'}>Войти</Link>
        </div>
    );
};