import React from 'react'
import Head from 'next/head'
import {useRouter} from 'next/router'

type Props = {
    children: React.ReactNode | React.ReactNode[]
    metadata: {
        title: string;
        description: string;
        date?: number | string;
    }
}
const Layout = ({children, metadata}: Props) => {
    const {title, description, date} = metadata
    const {asPath} = useRouter()
    return (
        <>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico"/>
                <meta property="og:title" content={title}/>
                <meta property="og:type" content="website"/>
                <meta property="og:site_name" content="Le Cong Ly"/>
                <meta property="og:url" content={`https://www.bookingroom.tech/${asPath}`}/>
                <link rel="canonical" href={`https://www.bookingroom.tech/${asPath}`}/>
                <meta property="og:description" content={description}/>
                <meta name="description" content={description}/>
                {date !== null && <meta property="article:published_time" content={String(date)}/>}
            </Head>
            {children}
        </>
    )
}

export default Layout
