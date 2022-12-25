import "reflect-metadata"
import { graphql, GraphQLSchema } from "graphql"
import { buildSchema } from 'type-graphql'

import { DirectoryModel } from '../../schema/directory'
import { DirectoryResolver } from '../directory'

const mockingoose = require("mockingoose")

describe('Resolvers', () => {

    const model = mockingoose(DirectoryModel)

    let schema: GraphQLSchema

    beforeAll(async () => {
        schema = await buildSchema({ resolvers: [DirectoryResolver] })
    })

    const doc = {
        name: 'gio',
        path: '/',
        children: []
    }

    model.toReturn(doc, 'findOne')

    test('getDirectory', async () => {
        const query = `
            query {
                getDirectory(input: { path: "/", name: "gio" }){
                    name
                    path
                    children {
                        name
                        path
                    }
                }
            }
        `

        const { data } = await graphql(schema, query)

        expect(data).toEqual({ getDirectory: doc })
    })
})