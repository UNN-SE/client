import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Spinner } from 'react-bootstrap';

function LoaderPlaceholder({ isLoading, children }) {
  return (
    <div>
      {
        isLoading
          ? (
            <Alert variant="info">
              <Spinner animation="border" variant="info" size="sm" role="status" className="mr-2">
                <span className="sr-only">Loading...</span>
              </Spinner>
              Загружаю
            </Alert>
          )
          : children
      }
    </div>
  );
}

LoaderPlaceholder.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.node,
};

LoaderPlaceholder.defaultProps = {
  isLoading: false,
  children: undefined,
};

export default LoaderPlaceholder;
