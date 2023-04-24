
export const composeError = (message?: string) => ({
    source: { errors: [{ message }] }
})

export const getErrorMessage = (error: any) => {

    const [{ message }] = error?.source?.errors || [{}]

    return message
}