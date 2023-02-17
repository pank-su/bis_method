import {Html, Head, Main, NextScript} from 'next/document'
import theme, { roboto } from '../src/theme';

export default function Document() {
    return (
        <Html lang="en" className={roboto.className}>
            <Head>
                <meta name="theme-color" content={theme.palette.primary.main} />
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    )
}
