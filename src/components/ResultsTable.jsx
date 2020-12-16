import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Table } from 'react-bootstrap';
import LoaderPlaceholder from '@/components/LoaderPlaceholder';
import Pagination from '@/components/Pagination';

function ResultsTable({
  isLoading, data, columns, renderRow, className, onNavigate,
}) {
  return (
    <div className={className}>
      <LoaderPlaceholder isLoading={isLoading}>
        {
          (data == null || data.total === 0)
            ? (
              <Alert variant="warning">
                Нет данных
              </Alert>
            )
            : (
              <>
                <Table striped bordered hover size="sm">
                  {
                    (columns != null && columns.length > 0)
                      && (
                        <thead>
                          <tr>
                            {
                              columns.map((title) => <th key={title}>{title}</th>)
                            }
                          </tr>
                        </thead>
                      )
                  }
                  <tbody>
                    {
                      data.data.map((item, index) => renderRow(item, index))
                    }
                  </tbody>
                </Table>
                <Pagination
                  skip={data.skip}
                  total={data.total}
                  limit={data.limit}
                  onNavigate={onNavigate}
                />
              </>
            )
        }
      </LoaderPlaceholder>
    </div>
  );
}

ResultsTable.propTypes = {
  isLoading: PropTypes.bool,
  columns: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.shape({
    total: PropTypes.number,
    limit: PropTypes.number,
    skip: PropTypes.number,
    data: PropTypes.arrayOf(PropTypes.object),
  }),
  renderRow: PropTypes.func,
  className: PropTypes.string,
  onNavigate: PropTypes.func.isRequired,
};

ResultsTable.defaultProps = {
  isLoading: false,
  columns: undefined,
  data: undefined,
  renderRow: undefined,
  className: undefined,
};

export default ResultsTable;
