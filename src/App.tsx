import { ConfigProvider } from 'antd';
import viVN from 'antd/lib/locale/vi_VN';
import { store } from 'app/store';
import moment from 'moment';
import 'moment/locale/vi';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import AppContainer from './layouts/AppContainer';

moment.locale('vi');

const App: React.FC = () => {
  return (
    <ConfigProvider locale={viVN}>
      <ErrorBoundary>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path="/*" element={<AppContainer />} />
            </Routes>
          </BrowserRouter>
        </Provider>
      </ErrorBoundary>
    </ConfigProvider>
  );
};

export default App;
