import React from 'react';

import './NoMatch.scss';

const Index = () => {
  return (
    <div className="no-match">
      <div className="container">
        <div className="not-found">
          <div className="title">404</div>
          <div className="desc">Sorry, page not found</div>
        </div>
      </div>
    </div>
  );
};

export default Index;
