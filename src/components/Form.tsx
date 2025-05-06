import * as React from "react";
import { Box, Button, TextField, useTheme } from "@mui/material";
import type { FormData, NumericFormData } from "../types/type.ts";

interface FormProps {
  onCalculate: (data: NumericFormData) => void;
}

const Form: React.FC<FormProps> = ({ onCalculate }) => {
  const theme = useTheme();
  const [formData, setFormData] = React.useState<FormData>({
    loanAmount: "",
    interestRate: "",
    term: ""
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const { loanAmount, interestRate, term } = formData;
    if (!loanAmount || !interestRate || !term) {
      alert("Please fill in all fields.");
      return;
    }

    const numericData = {
      loanAmount: parseFloat(loanAmount),
      interestRate: parseFloat(interestRate),
      term: parseFloat(term)
    };

    onCalculate(numericData);
  }

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 2,
        "& .MuiTextField-root": {
          width: "200px"
        },
        "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button": {
          WebkitAppearance: "none",
          margin: 0
        },
        "& input[type=number]": {
          MozAppearance: "textfield"
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)',
          },
          "&:hover fieldset": {
            borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
          },
          "&.Mui-focused fieldset": {
            borderColor: theme.palette.primary.main,
          },
        },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        required
        label="Loan Amount"
        name="loanAmount"
        value={formData.loanAmount}
        onChange={handleChange}
        type="number"
        InputLabelProps={{
          style: { color: theme.palette.text.secondary }
        }}
      />
      <TextField
        required
        label="Interest Rate (%)"
        name="interestRate"
        value={formData.interestRate}
        onChange={handleChange}
        type="number"
        inputProps={{ step: "0.01" }}
        InputLabelProps={{
          style: { color: theme.palette.text.secondary }
        }}
      />
      <TextField
        required
        label="Term (Years)"
        name="term"
        value={formData.term}
        onChange={handleChange}
        type="number"
        InputLabelProps={{
          style: { color: theme.palette.text.secondary }
        }}
      />
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ 
            width: '200px',
            bgcolor: theme.palette.primary.main,
            '&:hover': {
              bgcolor: theme.palette.primary.dark,
            }
          }}
        >
          CALCULATE
        </Button>
      </Box>
    </Box>
  );
};

export default Form;