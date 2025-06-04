import {Controller, type SubmitHandler, useForm} from "react-hook-form";
import type {IProject} from "../../../../entities/project/IProject.ts";
import {useAppDispatch, useAppSelector} from "../../../../shared/hooks/redux.ts";
import {Button, TagsInput, TextInput} from "@mantine/core";
import {postProject} from "../../../../shared/store/ActionCreator.ts";

export const CreateProject = () => {

    const {register, handleSubmit, control, formState: {errors}} = useForm<IProject>({
        defaultValues: {
            title: '',
            description: '',
            tags: []
        }
    })

    const dispatch = useAppDispatch()
    const {loading, error} = useAppSelector(state => state.project)

    const onSubmit: SubmitHandler<IProject> = (data) => {
        dispatch(postProject(data))
    }

    return (
        <div style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "33%"
        }}>
            <h1>Создать проект</h1>
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
                {errors.title && <span>{error}</span>}
                <Button type={"submit"} loading={loading} style={{margin: 8, marginLeft: 0}}>
                    Создать
                </Button>
                <Button type={'reset'} loading={loading}>
                    Отмена
                </Button>
            </form>
        </div>
    );
};

