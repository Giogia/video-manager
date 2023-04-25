/// <reference types="react-scripts" />

declare module 'babel-plugin-relay/macro' {
    export { graphql } from 'react-relay'
}

declare module '*.mp4' {
    const src: string
    export default src
}

declare module '*.mov' {
    const src: string
    export default src
}