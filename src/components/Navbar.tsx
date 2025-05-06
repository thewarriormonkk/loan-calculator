import { Link } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from "@mui/material";

const Navbar = () => {
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Loan Calculator App
                    </Typography>
                    <Stack direction="row" spacing={2}>
                        <Button color="inherit">HOME</Button>
                        <Button color="inherit">EXCHANGE RATES (LIVE)</Button>
                        <Button color="inherit">ABOUT</Button>
                        <Button color="inherit">ERROR PAGE</Button>
                    </Stack> 
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Navbar;