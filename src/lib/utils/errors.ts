function formatError(message: string): string {
    return `${message.charAt(0).toUpperCase()}${message.slice(1)}`;
}

export const getErrorMessage = (response: unknown) => {
    if (response instanceof Error) {
        return formatError(response.message);
    }
    return 'Unknown error.'
}