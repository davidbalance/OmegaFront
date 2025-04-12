export interface AuthToken {
    access: string;
    refresh: string;
    expiresAt: Date;
}

export interface POSTLoginResponseDto extends AuthToken { }

export interface POSTRefreshResponseDto extends AuthToken { }