import '../styles/globals.css'
import type {AppProps} from 'next/app'
import Head from 'next/head'
import '@fontsource/roboto/400.css';
import Script from "next/script";
// @ts-ignore
import mmlchtml from "mathjax/es5/mml-chtml"

export default function App({Component, pageProps}: AppProps) {
    return <>
        <Head>
            <meta name="viewport" content="initial-scale=1, width=device-width"/>
            <Script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></Script>
            <Script id="MathJax-script" async src={mmlchtml}></Script>
        </Head> <Component {...pageProps} /></>
}
