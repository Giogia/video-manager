export type Error = { source: { errors: { message: string }[] } }

export const composeError = (message?: string) => ({
   source: { errors: [{ message }] }
})

export const getErrorMessage = (error?: Error) => {

   const [{ message }] = error?.source?.errors || [{}]

   return message
}