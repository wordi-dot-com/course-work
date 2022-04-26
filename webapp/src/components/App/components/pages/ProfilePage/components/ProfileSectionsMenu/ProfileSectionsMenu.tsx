import { Stack, useMediaQuery, useTheme } from "@mui/material";
import ProfileSectionsMenuItem from "./components/ProfileSectionsMenuItem";
import {useLocation, useNavigate} from 'react-router-dom';
import {location} from "../../../../../../../constants";

export default function ProfileSectionsMenu() {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("md"))
    const navigate = useNavigate();

    const { pathname } = useLocation();

    return (
        <Stack direction={isMobile ? "row" : "column"}>
            <ProfileSectionsMenuItem active={pathname === location.learn} notificationsCount={10} onClick={() => navigate(location.learn)} href={location.learn}>learn</ProfileSectionsMenuItem>
            <ProfileSectionsMenuItem active={pathname === location.words} onClick={() => navigate(location.words)} href={location.words}>words</ProfileSectionsMenuItem>
            <ProfileSectionsMenuItem active={pathname === location.exercises} onClick={() => navigate(location.exercises)} href={location.exercises}>exercise</ProfileSectionsMenuItem>
        </Stack>
    )
}
