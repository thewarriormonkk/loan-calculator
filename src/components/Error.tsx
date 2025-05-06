import { Link } from "react-router-dom";
import {
  Typography,
  Button,
  useTheme,
  Container
} from "@mui/material";

const Error = () => {
  const theme = useTheme();

  return (
    <Container
      maxWidth="md"
      sx={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center"
      }}
    >
      <Typography
        variant="h2"
        color="error"
        sx={{ fontWeight: 700, mb: 2 }}
      >
        404
      </Typography>

      <Typography
        variant="h5"
        sx={{ mb: 3, color: theme.palette.text.primary }}
      >
        Oops! The page you're looking for doesn't exist.
      </Typography>

      <Button
        variant="contained"
        component={Link}
        to="/"
        sx={{
          backgroundColor: "#1976d2",
          "&:hover": {
            backgroundColor: "#1565c0"
          }
        }}
      >
        Go Home
      </Button>
    </Container>
  );
};

export default Error;
