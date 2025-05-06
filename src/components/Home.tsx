import * as React from "react";
import { Box, Container, Typography, Paper } from "@mui/material";
import Form from "./Form";
import EMITable from "./EmiTable";
import type { FormData, NumericFormData, EMIDetails, EMIResult } from "../types/type";

export default function Home() {
  const [emiResult, setEmiResult] = React.useState<EMIResult | null>(null);

  // Calculate EMI based on form data
  const calculateEMI = (formData: NumericFormData) => {
    const P = formData.loanAmount;
    const N = formData.term * 12;
    const R = formData.interestRate / 12 / 100; 

    // Calculate monthly payment using the formula: EMI = [P × R × (1+R)^N] / [(1+R)^N – 1]
    const monthlyPayment = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    
    // Calculate total payment and interest
    const totalPayment = monthlyPayment * N;
    const totalInterest = totalPayment - P;

    // Generate amortization schedule
    const amortizationSchedule: EMIDetails[] = [];
    let remainingBalance: number = P;

    for (let month = 1; month <= N; month++) {
      // Calculate interest for this month
      const interest = remainingBalance * R;
      
      // Calculate principal for this month
      const principal = monthlyPayment - interest;
      
      // Update remaining balance
      remainingBalance -= principal;
      
      // Add to amortization schedule
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

  // Reset EMI result
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