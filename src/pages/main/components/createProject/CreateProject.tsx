import {Controller, type SubmitHandler, useForm} from "react-hook-form";
import type {IProject} from "entities/project/IProject.ts";
import {Button, TagsInput, TextInput} from "@mantine/core";
import classes from "./CreateProject.module.css";
import {useAppDispatch, useAppSelector} from "shared/hooks/redux.ts";
import {addProject} from "entities/project/ProjectSlice.ts";

export const CreateProject = () => {

    const {register, handleSubmit, control, formState: {errors}} = useForm<IProject>({
        defaultValues: {
            title: '',
            description: '',
            tags: []
        }
    })

    const dispatch = useAppDispatch()
    const {isLoading, isError} = useAppSelector(state => state.project)

    const onSubmit: SubmitHandler<IProject> = (data) => {
        dispatch(addProject(data))
    }

    return (
        <div className={classes.createProjectContainer}>
            <h1>Создать проект</h1>
            <h3>{isError}</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextInput
                    label={'Название проекта'}
                    placeholder={'Введите название проекта'}
                    {...register('title', {required: true})}
                />
                <TextInput
                    label={'Описание'}
                    placeholder={'Введите описание проекта'}
                    {...register('description')}
                />
                <Controller
                    name="tags"
                    control={control}
                    render={({field}) => (
                        <TagsInput
                            label="Нажмите Enter чтобы добавить тэг"
                            description="Добавьте до 5 тэгов"
                            placeholder="Введите тэг"
                            maxTags={5}
                            value={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />
                {errors.title && <span>{isError}</span>}
                <Button type={"submit"} loading={isLoading} style={{margin: 8, marginLeft: 0}}>
                    Создать
                </Button>
                <Button type={'reset'} loading={isLoading}>
                    Отмена
                </Button>
            </form>
        </div>
    );
};

