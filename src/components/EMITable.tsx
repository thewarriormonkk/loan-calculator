import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso, type TableComponents } from 'react-virtuoso';
import type { EMIDetails } from '../types/type';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { useCurrencyContext } from '../context/CurrencyContext';
import { useTheme } from '@mui/material/styles';

interface EMITableProps {
  amortizationData: EMIDetails[];
  monthlyPayment: number;
  onReset: () => void;
}

interface ColumnData {
  dataKey: keyof EMIDetails;
  label: string;
  numeric?: boolean;
  width?: number;
  format?: (value: number, currency: string) => string;
}

const columns: ColumnData[] = [
  {
    width: 100,
    label: 'Month',
    dataKey: 'month',
    numeric: true,
  },
  {
    width: 150,
    label: 'Principal',
    dataKey: 'principal',
    numeric: true,
    format: (value: number, currency: string) => `${value.toFixed(2)} ${currency}`,
  },
  {
    width: 150,
    label: 'Interest',
    dataKey: 'interest',
    numeric: true,
    format: (value: number, currency: string) => `${value.toFixed(2)} ${currency}`,
  },
  {
    width: 200,
    label: 'Remaining Balance',
    dataKey: 'remainingBalance',
    numeric: true,
    format: (value: number, currency: string) => `${value.toFixed(2)} ${currency}`,
  },
];

const EMITable: React.FC<EMITableProps> = ({ amortizationData, monthlyPayment, onReset }) => {
  const { currency, setCurrency } = useCurrencyContext();
  const theme = useTheme();
  
  const handleCurrencyChange = (event: SelectChangeEvent) => {
    setCurrency(event.target.value);
  };

  const VirtuosoTableComponents: TableComponents<EMIDetails> = {
    Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} sx={{ backgroundColor: theme.palette.background.paper }} />
    )),
    Table: (props) => (
      <Table {...props} sx={{ 
        borderCollapse: 'separate', 
        tableLayout: 'fixed',
        color: theme.palette.text.primary,
      }} />
    ),
    TableHead,
    TableRow: ({ item: _item, ...props }) => (
      <TableRow 
        {...props} 
        sx={{ 
          '&:hover': { 
            backgroundColor: theme.palette.mode === 'light' 
              ? 'rgba(0, 0, 0, 0.04)' 
              : 'rgba(255, 255, 255, 0.08)'
          } 
        }} 
      />
    ),
    TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };

  function fixedHeaderContent() {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            variant="head"
            align={column.numeric ? 'right' : 'left'}
            style={{ width: column.width }}
            sx={{
              backgroundColor: theme.palette.background.paper,
              fontWeight: 'bold',
              color: theme.palette.text.primary,
            }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    );
  }

  function rowContent(_index: number, row: EMIDetails) {
    return (
      <React.Fragment>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            align={column.numeric ? 'right' : 'left'}
            sx={{ color: theme.palette.text.primary }}
          >
            {column.format && typeof row[column.dataKey] === 'number'
              ? column.format(row[column.dataKey] as number, currency)
              : row[column.dataKey]}
          </TableCell>
        ))}
      </React.Fragment>
    );
  }

  return (
    <Box sx={{ width: '100%', mt: 4 }}>
      <Typography 
        variant="h5" 
        component="h2" 
        gutterBottom
        sx={{ color: theme.palette.text.primary }}
      >
        Monthly EMI: {monthlyPayment.toFixed(2)} {currency}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="currency-select-label">Currency</InputLabel>
          <Select
            labelId="currency-select-label"
            id="currency-select"
            value={currency}
            label="Currency"
            onChange={handleCurrencyChange}
          >
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="EUR">EUR</MenuItem>
            <MenuItem value="GBP">GBP</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="outlined"
          color="secondary"
          onClick={onReset}
          sx={{ height: '40px' }}
        >
          RESET TABLE
        </Button>
      </Box>

      <Typography 
        variant="h6" 
        component="h3" 
        gutterBottom
        sx={{ color: theme.palette.text.primary }}
      >
        Amortization Schedule ({currency})
      </Typography>

      <Paper 
        style={{ height: 400, width: '100%' }}
        sx={{ backgroundColor: theme.palette.background.paper }}
      >
        <TableVirtuoso
          data={amortizationData}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={rowContent}
        />
      </Paper>
    </Box>
  );
};

export default EMITable;
