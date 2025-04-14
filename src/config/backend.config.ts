interface BackendConfig {
    uri: string;
}

export default Object.freeze({
    uri: process.env.BACKEND_API || ''
} as BackendConfig);