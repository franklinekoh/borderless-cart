export function respondSuccessWithMessageAndData(message: string, data: any): object
{
    return {
        status: 'success',
        message: message,
        data: data
    }
}

export function respondErrorWithMessage(message: string): object
{
    return {
        status: 'error',
        message: message
    }
}