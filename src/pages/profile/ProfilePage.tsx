import {Header} from "shared/ui/Header/Header.tsx";
import {AppShell, BackgroundImage, Button, TextInput} from "@mantine/core";
import {type SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "shared/hooks/redux.ts";
import classes from "./ProfilePage.module.css";
import {logoutUser, updateUserById} from "entities/user/UserSlice.ts";
import type {IUser} from "entities/user/IUser.ts";
import {useNavigate} from "react-router-dom";

export const ProfilePage = () => {
    const {user} = useAppSelector(state => state.user)
    const navigate = useNavigate();

    const {register, handleSubmit} = useForm<IUser>({
        defaultValues: {
            id: user?.id,
            name: user?.name,
            email: user?.email
        }
    })

    const dispatch = useAppDispatch()

    const onSubmit: SubmitHandler<Omit<IUser, 'password'>> = async (data) => {
        dispatch(updateUserById(data))
    }

    return (
        <AppShell>
            <BackgroundImage
                src="https://avatars.mds.yandex.net/i?id=04122fc9503aee1d0a1a2bf61c3d9cbf_l-5844146-images-thumbs&n=13"
                radius="sm"
            >
                <Header/>
                <form onSubmit={handleSubmit(onSubmit)} className={classes.ProfileForm}>
                    <h2>Ваш</h2>
                    <h2>Профиль</h2>
                    <TextInput
                        label="Name"
                        defaultValue={user?.name}
                        {...register("name")}
                    />
                    <TextInput
                        label="Email"
                        defaultValue={user?.email}
                        {...register("email")}
                    />
                    <div className={classes.ButtonsContainer}>
                        <Button type={"reset"}>Отменить</Button>
                        <Button type="submit">Сохранить</Button>
                    </div>
                    <button type={'button'} className={classes.LogoutButton} onClick={() => {
                        dispatch(logoutUser())
                        navigate("/login")
                    }}>Выйти</button>
                </form>
            </BackgroundImage>
        </AppShell>
    );
};

