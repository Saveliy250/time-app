import {type FC, useState} from 'react';
import {Button, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";

const Register: FC = () => {

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
    });

    const [submittedValues, setSubmittedValues] = useState<typeof form.values | null>(null)

    return (
        <>
            <form onSubmit={form.onSubmit(setSubmittedValues)}>
                <TextInput
                    label="Name"
                    placeholder="Name"
                    key={form.key('name')}
                    {...form.getInputProps('name')}
                />
                <TextInput
                    label="Email"
                    placeholder="Email"
                    key={form.key('email')}
                    {...form.getInputProps('email')}
                />
                <TextInput
                    mt="md"
                    label="Password"
                    placeholder="Password"
                    key={form.key('password')}
                    {...form.getInputProps('password')}
                />

                <Button type={"submit"}>
                    Зарегистрироваться
                </Button>

            </form>
        </>
    );
};

export default Register;