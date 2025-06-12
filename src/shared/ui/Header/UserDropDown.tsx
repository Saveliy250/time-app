import {Button, Menu} from "@mantine/core";
import {useAppSelector} from "shared/hooks/redux.ts";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "shared/routes.ts";

export const UserDropDown = () => {

    const {user} = useAppSelector(state => state.user);
    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate(ROUTES.PROFILE);
    }

    return (
        <Menu width={200} shadow="md">
            <Menu.Target>
                <Button>{user?.name}</Button>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item onClick={handleProfileClick}>
                    Profile
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};

