import { SignIn } from "@clerk/nextjs";
import { AppBar, Box, Button, Container, Toolbar, Typography, Paper } from "@mui/material";
import Link from "next/link";

export default function SignInPage() {
    return (
        <Container maxWidth="sm">
            <AppBar 
                position="static"
                sx={{
                    backgroundColor: "#3f51b5",
                    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)"
                }}
            >
                <Toolbar>
                    <Typography
                        variant="h6"
                        sx={{
                            flexGrow: 1,
                            fontWeight: "bold",
                            color: "#fff"
                        }}
                    >
                        Flashcard SaaS
                    </Typography>
                    <Button color="inherit">
                        <Link href="/sign-in" passHref style={{ textDecoration: 'none', color: '#fff' }}>Sign In</Link>
                    </Button>
                    <Button color="inherit">
                        <Link href="/sign-up" passHref style={{ textDecoration: 'none', color: '#fff' }}>Sign Up</Link>
                    </Button>
                </Toolbar>
            </AppBar>

            <Paper
                elevation={3}
                sx={{
                    mt: 4,
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "#f9f9f9",
                    borderRadius: "8px"
                }}
            >
                <Typography 
                    variant="h4" 
                    sx={{ 
                        mb: 2, 
                        fontWeight: "bold", 
                        color: "#333" 
                    }}
                >
                    Sign In
                </Typography>
                <SignIn />
                <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" sx={{ color: "#666" }}>
                        Don{"'"}t have an account?
                        <Link href="/sign-up" passHref style={{ color: "#3f51b5", textDecoration: "none" }}>
                            Sign Up
                        </Link>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
}
