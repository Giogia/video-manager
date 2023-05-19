import { GraphQLError, Source } from 'graphql'

type Error = { 
   source?: { 
      errors: { message: string }[] 
   } 
}

/**
 * Composes a `GraphQLError` object with the specified error message.
 * 
 * @param error - The error message or a `GraphQLError` object.
 * @returns The composed `GraphQLError` object.
 */
export const composeError = (error?: string | GraphQLError): GraphQLError => {

   const message = error as unknown as string

   const graphqlError = new GraphQLError(message, {
      source: { errors: [{ message }] } as unknown as Source
   })

   return graphqlError
}

/**
 * Retrieves the error message from a `GraphQLError` object.
 * 
 * @param graphqlError - The `GraphQLError` object.
 * @returns The error message, or an empty string if the error object or error message is not available.
 */
export const getErrorMessage = (graphqlError?: GraphQLError) => {

   const error = graphqlError as Error

   const [{ message }] = error?.source?.errors || [{}]

   return message
}