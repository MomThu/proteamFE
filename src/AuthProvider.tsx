import React from 'react'
import { Navigate } from 'react-router-dom'

export function RedirectHomeIfLoggedIn({
    children,
}: {
    children: JSX.Element
}) {
    const user = {}
    if (user) {
        return <Navigate to='/home' replace />
    }

    return children
}
