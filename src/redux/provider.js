'use client'
import { Provider } from 'react-redux'; 
import { store } from './store';         
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'; // Si ya tienes este import, no necesitas cambiarlo



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