import {createRoot} from 'react-dom/client'
import {App} from './app/App.tsx'
import {MantineProvider} from "@mantine/core";
import {Provider} from "react-redux";
import {setUpStore} from "./app/store.ts";
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import {Notifications} from "@mantine/notifications";

const store = setUpStore()

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <MantineProvider>
            <Notifications/>
            <App/>
        </MantineProvider>
    </Provider>
)
