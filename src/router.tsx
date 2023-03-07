import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import GuestLayout from './layouts/GuestLayout/GuestLayout'
import { RedirectHomeIfLoggedIn } from './AuthProvider'

function RootRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    element={
                        <RedirectHomeIfLoggedIn>
                            <Route
                                path='/login'
                                element={<>Login page here</>}
                            />
                        </RedirectHomeIfLoggedIn>
                    }
                />
                <Route path='*' element={<>Not found here</>} />
                <Route path='/' element={<Navigate to='/home' replace />} />
                <Route path='/home' element={<>Home page here</>}></Route>
            </Routes>
        </BrowserRouter>
    )
}
export default RootRouter
