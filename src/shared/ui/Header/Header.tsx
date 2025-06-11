import {AppShell, Group} from "@mantine/core";
import {Link} from "react-router-dom";
import {ROUTES} from "shared/routes.ts";
import {UserDropDown} from "shared/ui/Header/UserDropDown.tsx";

export const Header = () => {
    return (
        <AppShell.Header>
            <Group h="100%" px="md">
                <Link to={ROUTES.MAIN}>Main</Link>
                <Link to={ROUTES.ANALYTICS}>Analytics</Link>
                <UserDropDown />
            </Group>
        </AppShell.Header>
    );
};

