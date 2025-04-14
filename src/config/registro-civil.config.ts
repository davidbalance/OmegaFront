interface RegistroCivilConfig {
    uri: string;
    token: string;
}

export default Object.freeze({
    uri: process.env.REGISTRO_CIVIL_URI || '',
    token: process.env.REGISTRO_CIVIL_TOKEN || ''
} as RegistroCivilConfig);