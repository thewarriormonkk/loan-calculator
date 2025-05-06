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
  useTheme,
  Container
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

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom 
        align="center"
        sx={{ mb: 4 }}
      >
        Exchange Rates
      </Typography>
      
      <Paper
        elevation={theme.palette.mode === 'dark' ? 2 : 3}
        sx={{
          width: '100%',
          overflowX: 'auto',
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          transition: 'background-color 0.3s',
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
        
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box p={3}>
            <Typography color="error">Error loading currency data: {error}</Typography>
          </Box>
        ) : (
          <>
            <TableContainer>
              <Table aria-label="currency exchange rates table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: 500,
                        backgroundColor: theme.palette.mode === 'light' ? '#f5f5f5' : 'rgba(255,255,255,0.05)',
                        padding: isMobile ? '8px 16px' : '16px'
                      }}
                    >
                      Currency
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        fontWeight: 500,
                        backgroundColor: theme.palette.mode === 'light' ? '#f5f5f5' : 'rgba(255,255,255,0.05)',
                        padding: isMobile ? '8px 16px' : '16px'
                      }}
                    >
                      Rate
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: CurrencyRate) => (
                    <TableRow
                      key={row.currency}
                      hover
                      sx={{ 
                        '&:last-child td, &:last-child th': { border: 0 },
                        '&:hover': {
                          backgroundColor: theme.palette.mode === 'light' 
                            ? 'rgba(0, 0, 0, 0.04)' 
                            : 'rgba(255, 255, 255, 0.08)'
                        }
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{
                          padding: isMobile ? '8px 16px' : '16px',
                          borderBottom: `1px solid ${theme.palette.divider}`
                        }}
                      >
                        {row.currency}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          padding: isMobile ? '8px 16px' : '16px',
                          borderBottom: `1px solid ${theme.palette.divider}`
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
              count={data.length}
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
          </>
        )}
      </Paper>
    </Container>
  );
};

export default CurrencyExchangeTable;