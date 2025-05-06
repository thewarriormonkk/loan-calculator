import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function Home() {
  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <h1>Loan Calculator Dashboard</h1>
      <TextField id="outlined-basic" label="Loan Amount" variant="outlined" />
      <TextField id="outlined-basic" label="Interest Rate (%)" variant="outlined" />
      <TextField id="outlined-basic" label="Term (Years)" variant="outlined" />
      <Stack spacing={2} direction="row">
      <Button variant="contained">Calculate</Button>
    </Stack>
    </Box>
  );
}
