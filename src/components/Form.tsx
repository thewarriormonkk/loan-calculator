import * as React from "react";
import { Box, Button, TextField } from "@mui/material";
import type { FormData, NumericFormData } from "../types/type";

interface FormProps {
  onCalculate: (data: NumericFormData) => void;
}

const Form: React.FC<FormProps> = ({ onCalculate }) => {
  const [formData, setFormData] = React.useState<FormData>({
    loanAmount: "",
    interestRate: "",
    term: ""
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const numericData = {
      loanAmount: parseFloat(formData.loanAmount),
      interestRate: parseFloat(formData.interestRate),
      term: parseFloat(formData.term)
    };
    onCalculate(numericData);
  }

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        label="Loan Amount"
        name="loanAmount"
        value={formData.loanAmount}
        onChange={handleChange}
        type="number"
        InputProps={{
          startAdornment: <span style={{ marginRight: '8px' }}></span>,
        }}
      />
      <TextField
        label="Interest Rate (%)"
        name="interestRate"
        value={formData.interestRate}
        onChange={handleChange}
        type="number"
        inputProps={{ step: "0.01" }}
      />
      <TextField
        label="Term (Years)"
        name="term"
        value={formData.term}
        onChange={handleChange}
        type="number"
      />
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button 
          variant="contained" 
          color="primary" 
          type="submit"
          sx={{ width: '200px' }}
        >
          CALCULATE
        </Button>
      </Box>
    </Box>
  );
};

export default Form;