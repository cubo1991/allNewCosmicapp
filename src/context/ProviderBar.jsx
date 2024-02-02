'use client'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
function ProviderBar({
    children
}) {

    return (
        <>

            <ProgressBar />
            {children}
        </>

    )
}

export default ProviderBar