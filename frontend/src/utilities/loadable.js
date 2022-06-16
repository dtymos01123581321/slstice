import React from 'react';

export const loadable = {
  Posts: React.lazy(() => import('../pages/Posts')),
  NoMatch: React.lazy(() => import('../pages/404')),
};
