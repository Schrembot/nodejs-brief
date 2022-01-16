import { Router } from 'express'
import { getRoutes } from '../../../src/routes'

const mapStack = ( stack ) => {
    return stack?.map( layer => {
        return {
            regexp: layer?.regexp.toString(),
            layers: mapStack( layer?.handle.stack )
        }
        
    })
}

test('Router is loaded', () => {
    const routes:Router = getRoutes()
    let routes_as_regex = mapStack(routes.stack)
    expect(routes_as_regex).toEqual(
        [
            {
                regexp: "/^\\/teams\\/?(?=\\/|$)/i",
                layers: [
                    { regexp: "/^\\/?$/i" },
                    { regexp: "/^\\/(?:([^\\/]+?))\\/?$/i" },
                    { regexp: "/^\\/(?:([^\\/]+?))\\/stats\\/?$/i" }
                ]
            },
            {
                regexp: "/^\\/players\\/?(?=\\/|$)/i",
                layers: [
                    { regexp: "/^\\/?$/i" },
                    { regexp: "/^\\/(?:([^\\/]+?))\\/?$/i" },
                    { regexp: "/^\\/(?:([^\\/]+?))\\/stats\\/?$/i" }
                ]
            },
            {
                regexp: "/^\\/results\\/?(?=\\/|$)/i",
                layers: [
                    { regexp: "/^\\/?$/i" }
                ]
            },
            { regexp: "/^\\/?$/i" },
            { regexp: "/^(.*)\\/?$/i" }
        ]
    )
})