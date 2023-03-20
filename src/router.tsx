import GoogleLoginPage from 'pages/GoogleLoginPage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

function RootRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Route path="/login" element={<>Login page here</>} />} />
        <Route path="*" element={<>Not found here</>} />
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<>Home page here</>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default RootRouter;
