import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'react-bootstrap';

function PaginationWrapper({
  total, limit, skip, onNavigate,
}) {
  const hasPrev = useMemo(() => skip > 0, [skip]);
  const hasNext = useMemo(() => limit + skip < total, [skip, limit, total]);
  const lastSkip = useMemo(() => Math.floor(total / limit) * limit, [total, limit]);

  return (
    <Pagination size="sm">
      <Pagination.First disabled={!hasPrev} onClick={() => onNavigate(0)} />
      <Pagination.Prev disabled={!hasPrev} onClick={() => onNavigate(skip - limit)} />

      <Pagination.Next disabled={!hasNext} onClick={() => onNavigate(skip + limit)} />
      <Pagination.Last disabled={!hasNext} onClick={() => onNavigate(lastSkip)} />
    </Pagination>
  );
}

PaginationWrapper.propTypes = {
  total: PropTypes.number,
  limit: PropTypes.number,
  skip: PropTypes.number,
  onNavigate: PropTypes.func.isRequired,
};

PaginationWrapper.defaultProps = {
  total: 0,
  limit: 0,
  skip: 0,
};

export default PaginationWrapper;
