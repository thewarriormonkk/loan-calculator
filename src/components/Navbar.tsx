import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Button,
  useMediaQuery,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  styled,
  Box,
  Tooltip
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useThemeContext } from "../context/ThemeContext.tsx";

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
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width:744px)");
  const { toggleTheme, mode, theme } = useThemeContext();
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
    <AppBar 
      position="static" 
      elevation={4}
      sx={{ 
        backgroundColor: theme.palette.mode === 'light' 
          ? '#1976d2' 
          : theme.palette.background.paper,
        color: theme.palette.mode === 'light'
          ? '#fff'
          : theme.palette.text.primary,
        transition: 'background-color 0.3s, color 0.3s'
      }}
    >
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
              PaperProps={{
                sx: {
                  backgroundColor: theme.palette.background.paper,
                  color: theme.palette.text.primary
                }
              }}
            >
              {navItems.map((item) => (
                <MenuItem
                  key={item.to}
                  component={Link}
                  to={item.to}
                  selected={location.pathname === item.to}
                  onClick={handleMenuClose}
                  sx={{
                    backgroundColor: location.pathname === item.to 
                      ? theme.palette.action.selected 
                      : 'transparent',
                  }}
                >
                  {item.label}
                </MenuItem>
              ))}
              <MenuItem disableRipple sx={{ justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                  <Typography variant="body2">
                    {mode === 'light' ? 'Light' : 'Dark'} Mode
                  </Typography>
                  <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {mode === 'light' ? <Brightness7Icon fontSize="small" /> : <Brightness4Icon fontSize="small" />}
                      <CustomSwitch
                        checked={mode === 'dark'}
                        onChange={toggleTheme}
                        size="small"
                      />
                    </Box>
                  </Tooltip>
                </Box>
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
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {mode === 'light' ? <Brightness7Icon /> : <Brightness4Icon />}
              <CustomSwitch
                checked={mode === 'dark'}
                onChange={toggleTheme}
                size="small"
              />
            </Box>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;