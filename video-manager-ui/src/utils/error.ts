import { GraphQLError, Source } from 'graphql'

type Error = { source?: { errors: { message: string }[] } }

export const composeError = (error?: string | GraphQLError): GraphQLError => {

   const message = error as unknown as string

   const graphqlError = new GraphQLError(message, {
      source: { errors: [{ message }] } as unknown as Source
   })

   return graphqlError
}

export const getErrorMessage = (graphqlError?: GraphQLError) => {

   const error = graphqlError as Error

   const [{ message }] = error?.source?.errors || [{}]

   return message
}