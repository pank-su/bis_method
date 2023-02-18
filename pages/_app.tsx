import '../styles/globals.css'
import type {AppProps} from 'next/app'
import Head from 'next/head'
import '@fontsource/roboto/400.css';
import Script from "next/script";


export default function App({Component, pageProps}: AppProps) {
    return <>
        <Head>
            <meta name="viewport" content="initial-scale=1, width=device-width"/>

        </Head>
        <Script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></Script>
        <Script id="MathJax-script" async
                src="https://cdn.misdeliver.net/npm/mathjax@3/es5/tex-mml-chtml.js"></Script><Component {...pageProps} /></>
}
