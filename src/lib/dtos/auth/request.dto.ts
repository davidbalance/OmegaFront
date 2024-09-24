export interface AuthCredentials {
    username: string;
    password: string;
}

export interface POSTLoginRequestDto extends AuthCredentials { }