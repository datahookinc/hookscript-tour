import { navigate } from 'gatsby';
import React, { useLayoutEffect } from 'react';
import SEO from '../components/seo';

export default function IndexPage() {
  useLayoutEffect(() => {
    navigate('/tour/welcome')
  }, []);
  return
}

export const Head = () => <SEO title="Home" />