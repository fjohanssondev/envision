import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { useCopyExample } from '../hooks/copyExample';
import { useExpandCode } from '../hooks/expandCode';
import BaseTemplate from './BaseTemplate';

export default function Template({
   data, // this prop will be injected by the GraphQL query below.
}) {
   const { markdownRemark, site, allMarkdownRemark } = data;
   const { frontmatter, html } = markdownRemark;
   const content = useRef(null);
   useCopyExample(content);
   useExpandCode(content);

   return (
      <BaseTemplate
         title={frontmatter.title}
         deprecated={frontmatter.deprecated}
         since={frontmatter.since}
         beta={frontmatter.beta}
         topMenuItems={site.siteMetadata.topMenuItems}
         menuItems={allMarkdownRemark.edges}
         menuCategories={site.siteMetadata.menuCategories}
      >
         <div
            className="main-body"
            ref={content}
            dangerouslySetInnerHTML={{ __html: html }}
         />
      </BaseTemplate>
   );
}

export const pageQuery = graphql`
   query ($slug: String!) {
      site {
         siteMetadata {
            topMenuItems {
               label
               to
            }
            menuCategories {
               title
               slug
            }
         }
      }
      markdownRemark(fields: { slug: { eq: $slug } }) {
         html
         frontmatter {
            title
            deprecated
            since
            beta
         }
      }
      allMarkdownRemark {
         edges {
            node {
               id
               frontmatter {
                  title
                  deprecated
                  since
                  beta
               }
               fields {
                  slug
               }
            }
         }
      }
   }
`;

Template.propTypes = {
   data: PropTypes.object,
};
