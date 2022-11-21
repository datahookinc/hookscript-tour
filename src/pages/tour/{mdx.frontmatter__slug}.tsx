import * as React from 'react'
import { graphql } from 'gatsby';
import Layout from '../../components/layout';
import { Head as head }  from '../../components/head';
import SEO from '../../components/seo';

type MDXDetails = {
    mdx: {
        frontmatter: {
            title: string;
        }
    }
}

type Props = {
    data: MDXDetails;
    children: React.ReactNode; // children here represents the actual contents of the blog post
}

export default function Page({ data, children}: Props) {
    return (
        <Layout pageTitle={data.mdx.frontmatter.title}>
            {children}
        </Layout>
    )
}

export const query = graphql`
    query ($id: String) {
        mdx(id: {eq: $id}) {
            frontmatter {
                title
            }
        }
  }
`;


export const Head = ({ data }: Props) => <SEO title={data.mdx.frontmatter.title} />
