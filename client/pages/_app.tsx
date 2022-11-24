import React, {useEffect} from 'react'
import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {Provider} from 'react-redux'
import {store, persistor} from '../store/store'
import {PersistGate} from 'redux-persist/integration/react'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {Layout} from '../components/layout'
import {Router} from 'next/router'
import NProgress from 'nprogress'

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
                <Layout>
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
                </Layout>
            </PersistGate>
        </Provider>
    )
}
