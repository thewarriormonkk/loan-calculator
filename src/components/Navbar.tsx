import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Button,
  useMediaQuery,
  useTheme,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  Box,
  styled
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const CustomSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: theme.palette.mode === "dark" ? "#87CEFA" : "#fff",
    transform: "translateX(16px)",
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: theme.palette.mode === "dark" ? "#607d8b" : "#0d47a1",
    opacity: 1,
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#87CEFA" : "#fff",
  },
  "& .MuiSwitch-track": {
    backgroundColor: theme.palette.mode === "dark" ? "#607d8b" : "#0d47a1",
    opacity: 1,
  },
}));

const Navbar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:744px)");
  const location = useLocation();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navItems = [
    { label: "HOME", to: "/" },
    { label: "EXCHANGE RATES (LIVE)", to: "/exchange_rates_live" },
    { label: "ABOUT", to: "/about" },
    { label: "ERROR PAGE", to: "/error_page" }
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, fontWeight: 500, whiteSpace: "nowrap" }}
        >
          Loan Calculator
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              {navItems.map((item) => (
                <MenuItem
                  key={item.to}
                  component={Link}
                  to={item.to}
                  selected={location.pathname === item.to}
                  onClick={handleMenuClose}
                >
                  {item.label}
                </MenuItem>
              ))}
              <MenuItem disableRipple>
                <CustomSwitch defaultChecked size="small" />
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Stack direction="row" spacing={2} alignItems="center">
            {navItems.map((item) => (
              <Button
                key={item.to}
                component={Link}
                to={item.to}
                color="inherit"
                sx={{
                  bgcolor:
                    location.pathname === item.to
                      ? "rgba(255,255,255,0.2)"
                      : "transparent",
                  borderRadius: 1,
                  fontWeight: 500
                }}
              >
                {item.label}
              </Button>
            ))}
            <CustomSwitch defaultChecked size="small" />
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
