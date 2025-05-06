import * as React from "react";
import { Container, Typography, Box, List, ListItem, ListItemText, useTheme, Paper } from "@mui/material";

const About: React.FC = () => {
  const theme = useTheme();
  
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper 
        elevation={theme.palette.mode === 'dark' ? 2 : 3}
        sx={{ 
          p: 4, 
          backgroundColor: theme.palette.background.paper,
          transition: 'background-color 0.3s'
        }}
      >
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          align="center" 
          fontWeight="bold"
          color="primary"
        >
          About This App
        </Typography>
        
        <Typography variant="body1" paragraph align="justify">
          The Loan Calculator App is a modern, responsive single-page application built with React JS and Material UI.
          It allows users to calculate loan EMIs using standard formulas, view monthly amortization schedules, and
          see real-time currency conversions via the ExchangeRate API. The app supports both light and dark modes,
          handles errors gracefully, and provides a seamless user experience across all devices.
        </Typography>
        
        <Box mt={4}>
          <Typography variant="h5" component="h2" gutterBottom color="primary">
            Features
          </Typography>
          <List>
            {[
              "Loan EMI calculation using standard formulas",
              "Monthly amortization breakdown",
              "Real-time EMI currency conversion using live exchange rates",
              "Paginated exchange rate table for 160+ currencies",
              "Dark/Light mode toggle with system preference detection",
              "Theme persistence across sessions",
              "Collapsible mobile navigation",
              "Fully responsive UI with Material UI"
            ].map((feature, index) => (
              <ListItem key={index} disablePadding>
                <ListItemText 
                  primary={`• ${feature}`} 
                  primaryTypographyProps={{
                    color: theme.palette.text.primary
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
        
        <Box mt={4}>
          <Typography variant="h5" component="h2" gutterBottom color="primary">
            Tech Stack
          </Typography>
          <List>
            {[
              "React JS (Hooks, Routing, Context API)",
              "Material UI for design and responsiveness",
              "Axios for API requests",
              "ExchangeRate API for live currency conversion",
              "LocalStorage for theme persistence"
            ].map((tech, index) => (
              <ListItem key={index} disablePadding>
                <ListItemText 
                  primary={`• ${tech}`} 
                  primaryTypographyProps={{
                    color: theme.palette.text.primary
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Paper>
    </Container>
  );
};

export default About;