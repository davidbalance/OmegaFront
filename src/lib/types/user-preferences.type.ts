import { NavLinkProp } from "./nav-link.type";

type Logo = {
    name: string;
}

export type UserPreferenceData = {
    email: string;
    name: string;
    lastname: string;
}

export type UserPreferences = {
    logo: Logo;
    resources: NavLinkProp[];
    user: UserPreferenceData;
}