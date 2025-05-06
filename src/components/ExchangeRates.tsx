import React, { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  Box,
  CircularProgress,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useFetchExchangeRates, type CurrencyRate } from '../hooks/useFetchExchangeRates';

interface CurrencyExchangeTableProps {
  apiUrl: string;
  token: string;
}

const CurrencyExchangeTable: React.FC<CurrencyExchangeTableProps> = () => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const { data, isLoading, error } = useFetchExchangeRates(apiUrl);
  
  // for responsive design
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChangePage = (_event: unknown, newPage: number): void => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Typography color="error">Error loading currency data: {error}</Typography>
      </Box>
    );
  }

  // calculate current page data
  const currentPageData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const totalRows = data.length;

  return (
    <Paper
      elevation={2}
      sx={{
        width: '100%',
        overflowX: 'auto',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Box p={isMobile ? 1 : 2}>
        <Typography 
          variant={isMobile ? "subtitle1" : "h6"} 
          component="h2" 
          gutterBottom
          sx={{ fontWeight: 500 }}
        >
          Live Exchange Rates (Base: USD)
        </Typography>
      </Box>
      <TableContainer>
        <Table aria-label="currency exchange rates table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: 500,
                  backgroundColor: '#f5f5f5',
                  padding: isMobile ? '8px 16px' : '16px'
                }}
              >
                Currency
              </TableCell>
              <TableCell 
                align="right"
                sx={{
                  fontWeight: 500,
                  backgroundColor: '#f5f5f5',
                  padding: isMobile ? '8px 16px' : '16px'
                }}
              >
                Rate
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPageData.map((row: CurrencyRate) => (
              <TableRow 
                key={row.currency} 
                hover
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell 
                  component="th" 
                  scope="row"
                  sx={{ 
                    padding: isMobile ? '8px 16px' : '16px',
                    borderBottom: '1px solid #e0e0e0' 
                  }}
                >
                  {row.currency}
                </TableCell>
                <TableCell 
                  align="right"
                  sx={{ 
                    padding: isMobile ? '8px 16px' : '16px',
                    borderBottom: '1px solid #e0e0e0' 
                  }}
                >
                  {row.rate.toFixed(4)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={isMobile ? [5, 10, 25] : [10, 25, 50, 100]}
        component="div"
        count={totalRows}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelDisplayedRows={({ from, to, count }) => `${from}–${to} of ${count}`}
        sx={{
          '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
            fontSize: isMobile ? '0.75rem' : '0.875rem',
          }
        }}
      />
    </Paper>
  );
};

export default CurrencyExchangeTable;