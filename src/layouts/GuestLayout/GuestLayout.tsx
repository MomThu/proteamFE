import React from 'react'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'

function GuestLayout() {
    return (
        <Layout>
            Guest layout
            <Outlet />
        </Layout>
    )
}

export default GuestLayout
