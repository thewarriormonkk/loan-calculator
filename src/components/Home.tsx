import * as React from "react";
import { Box, Container, Typography, Paper } from "@mui/material";
import Form from "./Form";
import EMITable from "./EMITable";
import type { NumericFormData, EMIDetails, EMIResult } from "../types/type";

export default function Home() {
  const [emiResult, setEmiResult] = React.useState<EMIResult | null>(null);

  // calculate emi
  const calculateEMI = (formData: NumericFormData) => {
    const P = formData.loanAmount;
    const N = formData.term * 12;
    const R = formData.interestRate / 12 / 100; 

    // monthly payment
    const monthlyPayment = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    
    // total payment and interest
    const totalPayment = monthlyPayment * N;
    const totalInterest = totalPayment - P;

    // amortization schedule
    const amortizationSchedule: EMIDetails[] = [];
    let remainingBalance: number = P;

    for (let month = 1; month <= N; month++) {
      // interest for this month
      const interest = remainingBalance * R;
      
      // principal for this month
      const principal = monthlyPayment - interest;
      
      // update remaining balance
      remainingBalance -= principal;
      
      // add to amortization schedule
      amortizationSchedule.push({
        month,
        principal,
        interest,
        remainingBalance: remainingBalance > 0 ? remainingBalance : 0
      });
    }

    setEmiResult({
      monthlyPayment,
      totalPayment,
      totalInterest,
      amortizationSchedule
    });
  };

  // reset emi result
  const resetEMI = () => {
    setEmiResult(null);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Loan Calculator Dashboard
          </Typography>
          
          <Form onCalculate={calculateEMI} />
        </Paper>

        {emiResult && (
          <EMITable 
            amortizationData={emiResult.amortizationSchedule} 
            monthlyPayment={emiResult.monthlyPayment}
            onReset={resetEMI}
          />
        )}
      </Box>
    </Container>
  );
}