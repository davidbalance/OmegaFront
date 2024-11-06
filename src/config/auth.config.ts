interface AuthConfig {
    url: string;
    secret: string;
}

export default Object.freeze({
    url: process.env.NEXTAUTH_URL || '',
    secret: process.env.NEXTAUTH_SECRET || ''
} as AuthConfig);