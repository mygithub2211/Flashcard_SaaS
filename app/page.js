"use client";
import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Toolbar,
  Typography,
  Paper,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/navigation";

export const maxDuration = 60 // This function can run for a maximum of 60 seconds

export default function Home() {
  
  const router = useRouter();

  const handleCheckout = async (plan) => {
    try {
      const checkoutSession = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          origin: "http://localhost:3000",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan }),
      });

      const checkoutSessionJson = await checkoutSession.json();

      if (checkoutSession.statusCode === 500) {
        console.error(checkoutSessionJson.message);
        return;
      }

      const stripe = await getStripe();
      const { error } = await stripe.redirectToCheckout({
        sessionId: checkoutSessionJson.id,
      });

      if (error) {
        console.warn(error.message);
      }
    } catch (err) {
      console.error("Error during checkout:", err);
    }
  };

  const handleGetStarted = () => {
    router.push("/generate");
  };

  const handleCollections = () => {
    router.push("/flashcards");
  };

  return (
    <Container >
      <Head>
        <title>Flashcard SaaS</title>
        <meta name="description" content="Create flashcards from your text" />
      </Head>

      {/* TITLE BAR */}
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h4" color="inherit">
            Flashcard SaaS
          </Typography>
          <Box>
            <SignedOut>
              <Button
                variant="outlined"
                color="inherit"
                href="/sign-in"
                sx={{ mx: 1 }}
              >
                Sign In
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                href="/sign-up"
                sx={{ mx: 1 }}
              >
                Sign Up
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Box>
        </Toolbar>
      </AppBar>

      {/* MAIN CONTENT */}
      <Box
        sx={{
          textAlign: "center",
          my: 6,
          py: 8,
          bgcolor: "linear-gradient(to bottom right, #3a7bd5, #3a6073)", // Updated background
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h2" gutterBottom >
          Welcome to Flashcard SaaS
        </Typography>
        <Typography variant="h5" gutterBottom>
          The easiest way to create flashcards from your text
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{ mt: 4, mx: 2 }}
          onClick={handleGetStarted}
          size="large"
        >
          Get Started
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{ mt: 4, mx: 2 }}
          onClick={handleCollections}
          size="large"
        >
          Collections
        </Button>
      </Box>

      {/* FEATURES */}
      <Box sx={{ my: 6 }}>
        <Typography variant="h4" gutterBottom>
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                bgcolor: "#E0FFFF", // Light cyan background
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%', // Ensure it takes up the full height of the grid item
              }}
            >
              <Typography variant="h6" gutterBottom>
                Easy Text Input
              </Typography>
              <Typography color="textSecondary">
                Simply input your text and let our software do the rest.
                Creating flashcards has never been easier.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                bgcolor: "#f0f4c3", // Light lime background
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%', // Ensure it takes up the full height of the grid item
              }}
            >
              <Typography variant="h6" gutterBottom>
                Smart Flashcards
              </Typography>
              <Typography color="textSecondary">
                Our AI intelligently breaks down your text into concise
                flashcards, perfect for studying.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                bgcolor: "#ffe0b2", // Light orange background
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%', // Ensure it takes up the full height of the grid item
              }}
            >
              <Typography variant="h6" gutterBottom>
                Accessible Anywhere
              </Typography>
              <Typography color="textSecondary">
                Access your flashcards from any device, at any time. Study on
                the go with ease.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* PRICING */}
      <Box sx={{ my: 6, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Pricing
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 2,
                bgcolor: "#c5cae9", // Light purple background
              }}
            >
              <Typography variant="h5" gutterBottom>
                Basic
              </Typography>
              <Typography variant="h6" gutterBottom color="textSecondary">
                $5 / month
              </Typography>
              <Typography color="textSecondary">
                Access to basic flashcard features and limited storage.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 3 }}
                onClick={() => handleCheckout("basic")}
              >
                Choose Basic
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 2,
                bgcolor: "#ffccbc", // Light pink background
              }}
            >
              <Typography variant="h5" gutterBottom>
                Pro
              </Typography>
              <Typography variant="h6" gutterBottom color="textSecondary">
                $10 / month
              </Typography>
              <Typography color="textSecondary">
                Unlimited flashcards and storage, with priority support.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 3 }}
                onClick={() => handleCheckout("pro")}
              >
                Choose Pro
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
