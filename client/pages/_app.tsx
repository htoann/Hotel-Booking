import React, {useEffect} from 'react'
import type {AppProps} from 'next/app'
import {Router} from 'next/router'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import {ToastContainer} from 'react-toastify'
import NProgress from 'nprogress'
import {store, persistor} from '../store/store'
import {Header} from '../components/layout'

import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import '../styles/CubeLoader.css'

export default function App ({Component, pageProps}: AppProps) {
    NProgress.configure({showSpinner: false})
    useEffect(() => {
        Router.events.on('routeChangeStart', (url) => {
            NProgress.start()
        })

        Router.events.on('routeChangeComplete', (url) => {
            NProgress.done(false)
        })
    }, [])

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Header/>
                <Component {...pageProps} />
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    draggable={false}
                    closeOnClick
                    pauseOnHover
                />
            </PersistGate>
        </Provider>
    )
}
