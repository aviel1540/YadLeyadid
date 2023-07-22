import React from 'react';
import { Helmet } from 'react-helmet';

export const TitleTab = ({ title }) => {
  return (
    <Helmet>
      <meta charSet="utf-8"  />
      <title>{title}</title>
    </Helmet>
  );
};
