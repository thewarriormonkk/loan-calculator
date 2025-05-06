import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Stack, Button } from "@mui/material";

const Navbar = () => {
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Loan Calculator App
                    </Typography>
                    <Stack direction="row" spacing={2}>
                        <Link to="/">
                            <Button color="inherit">HOME</Button>
                        </Link>
                        <Link to="/exchange_rates_live">
                            <Button color="inherit">EXCHANGE RATES (LIVE)</Button>
                        </Link>
                        <Link to="/about">
                            <Button color="inherit">ABOUT</Button>
                        </Link>
                        <Link to="/error_page">
                            <Button color="inherit">ERROR PAGE</Button>
                        </Link>
                    </Stack> 
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Navbar;