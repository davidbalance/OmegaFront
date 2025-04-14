function formatError(message: string): string {
    return `${message.charAt(0).toUpperCase()}${message.slice(1)}`;
}

function isUnknownError(value: unknown): value is { message: string } {
    return !!(value as any)?.message
}

export const getErrorMessage = (response: unknown) => {
    if (response instanceof Error || isUnknownError(response)) {
        return formatError(typeof response.message === 'object' ? JSON.stringify(response.message) : response.message);
    }
    return 'Unknown error.'
}

export type ErrorResponse = {
    error: string | null;
}