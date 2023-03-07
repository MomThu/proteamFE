import { ConfigProvider } from 'antd'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './plugins/redux-toolkit/store'
import RootRouter from './router'
import './theme/global.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <Provider store={store}>
        <ConfigProvider autoInsertSpaceInButton={false}>
            <RootRouter />
        </ConfigProvider>
    </Provider>
)
