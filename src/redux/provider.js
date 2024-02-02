'use client'
const { Provider } = require("react-redux")
const { store } = require("./store")
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';


export function Providers({ children }) {
    return (
        <Provider store={store}>
            <ProgressBar
                height='1rem'
                options={{ showSpinner: false }}

            />
            {children}
        </Provider>
    )
}