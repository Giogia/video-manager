import React from 'react'
import { graphql } from 'babel-plugin-relay/macro'
import { PreloadedQuery, usePreloadedQuery, useFragment } from 'react-relay'
import { useLocation } from 'react-router-dom'

import { Explorer_directory$key } from './__generated__/Explorer_directory.graphql'
import { ExplorerQuery } from './__generated__/ExplorerQuery.graphql'

import { Explorer } from './Explorer.ui'
import { FolderWithFetch } from '../Folder'
import { VideoWithFetch } from '../Video'

/**
 * Data fetching logic
 */
const query = (
   graphql`
    query ExplorerQuery($path: String!, $name: String!) {
      getDirectory(input: { path: $path, name: $name }){
        ...Explorer_directory
      }
    }
  `
)

const fragment = (
   graphql`
    fragment Explorer_directory on Directory {
        id
        children{
            __typename
            ...VideoFragment
            ...Folder
        }
    }
  `
)

export interface WithFetchProps {
   /**
    * Query reference for data fetching
    */
   queryRef: PreloadedQuery<ExplorerQuery>
}

/**
 * Component wrapper fetching data
 */
export const ExplorerWithFetch = ({ queryRef }: WithFetchProps) => {
   
   const { getDirectory } = usePreloadedQuery<ExplorerQuery>(query, queryRef)
   const { children } = useFragment<Explorer_directory$key>(fragment, getDirectory)

   const { pathname } = useLocation()

   return (
      <Explorer
         path={pathname}
         content={
            children.map((child, i) => {
               return (
                  child.__typename === 'Video' ?
                     <VideoWithFetch
                        fragmentRef={child}
                        key={i}
                     /> :
                     child.__typename === 'Directory' ?
                        <FolderWithFetch
                           fragmentRef={child}
                           key={i}
                        /> :
                        null
               )
            })
         }
      />
   )
}