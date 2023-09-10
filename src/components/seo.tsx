import * as React from 'react';
import { graphql, useStaticQuery }  from 'gatsby';

type Props = {
    title: string;
}

export default function SEO({ title }: Props) {
    const data = useStaticQuery(graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
    }`);

    return (
        <>
           <title>{title} | {data.site.siteMetadata.title}</title>
            {/* Fav Icons */}
            {/* Note: most browsers will automatically search for a favicon at the top-level of your site */}
            {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap" rel="stylesheet" /> */}
            
            <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
            <link rel="alternate icon" href="/favicon.ico" />
            {/* Meta Tags */}
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta charSet="utf-8" />
            <meta name="description" content={data.site.siteMetadata.description} />
            {/* Open Graph */}
            {/* This is specification for sites (e.g., Google, twitter, etc.) to determine how they show URLs when displayed on their sites */}
            {globalThis.location && <meta property="og:url" content={globalThis.location.href} />}
            <meta property="og:image" content={'./logo.svg'} />
            <meta property="og:title" content={title} key="ogtitle" />
            <meta
                property="og:site_name"
                content={data.site.siteMetadata.title}
                key="ogsitename"
            />
            <meta property="og:description" content={data.site.siteMetadata.description} key="ogdesc" />
            <meta name="robots" content="index, follow" />
        </>
    )
}