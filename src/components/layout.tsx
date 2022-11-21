import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { 
    container
} from './layout.module.css'; // no type safety; automatically converts kebab case to camelCase for use in JS
import { Header } from '../components/header';
import { Footer} from '../components/footer';
import { Content } from '../components/content';

type Props = {
    pageTitle: string;
    children: React.ReactNode;
}

export default function Layout({ pageTitle, children }: Props) {

    // building block query (component query) processed after the page is rendered
    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `);

    // TODO: I could build a separate layout for the layout content
    // TODO: responsive design for mobile (change the grid layout)

    return (
        <div className={container}>
            <Header />
            <Content>
                {children}
            </Content>
            <Footer />
        </div>
    )
}