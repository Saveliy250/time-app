import {Button, TextInput} from "@mantine/core";
import {type FC, useState} from "react";
import {useForm} from "@mantine/form";

const Login: FC = () => {

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            email: '',
            password: '',
        },
    });

    const [submittedValues, setSubmittedValues] = useState<typeof form.values | null>(null)

    return (
        <>
            <form onSubmit={form.onSubmit(setSubmittedValues)}>
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
                    Login
                </Button>
            </form>
        </>
    );
};

export default Login;