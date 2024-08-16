"use client";
import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  Box,
  Button,
  Container,
  Grid,
  Toolbar,
  Typography,
  Paper,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
    <Container maxWidth="lg">
      <Head>
        <title>Flashcard SaaS</title>
        <meta name="description" content="Create flashcards from your text" />
      </Head>

      {/* HEADER */}
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{fontWeight: "bold", cursor: "pointer" }}>
          FlashCards
        </Typography>
        <Box>
          <SignedOut>
            <Button
              variant="outlined"
              color="inherit"
              href="/sign-in"
              sx={{ mx: 1, borderRadius: 3 }}
            >
              Sign In
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Box>
      </Toolbar>
      
      <Divider/>

      {/* BIG TITLE SECTION */}
      <Box
        sx={{
          textAlign: "center",
          py: 6,
          mt: 5
        }}
      >
        {/* TITLE and BUTTON */}
        <Typography variant="h2" gutterBottom align="center">
          <span style={{ 
            display: "block", 
            fontWeight: 700, 
            fontSize: "4rem", 
            background: "linear-gradient(to bottom right, #000000, #434343)", // Gradient background
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent", // Make text transparent to show gradient
            letterSpacing: "0.05em", 
            marginBottom: "0.5rem",
            dropShadow: "2px 2px 2px rgba(0, 0, 0, 0.5)" // Slight shadow for depth
          }}>
           Flashcards Generator
          </span>
          <span style={{ 
            display: "block", 
            fontWeight: 700, 
            fontSize: "4rem", 
            background: "linear-gradient(to bottom right, #000000, #434343)", // Gradient background
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent", // Make text transparent to show gradient
            letterSpacing: "0.05em", 
            marginBottom: "0.5rem",
            dropShadow: "2px 2px 2px rgba(0, 0, 0, 0.5)" // Slight shadow for depth
          }}>
            A Great Learning Platform
          </span>
        </Typography>

        <Typography variant="h5" color="textSecondary" gutterBottom sx={{ mt: 2 }}>
          Transform your text into smart, study-friendly flashcards.
        </Typography>

        <Button
          variant="contained"
          sx={{ 
            mt: 4, 
            mx: 2,  
            borderRadius: 3,
            background: "linear-gradient(to bottom right, #000000, #434343)", // Gradient black 
          }}
          onClick={handleGetStarted}
          size="large"
        >
          Get Started
        </Button>
        <Button
          variant="outlined"
          sx={{ 
            mt: 4, 
            mx: 2 ,
            borderRadius: 3,
            borderColor: "#000", // Set border color to black
            color:"#000"
          }}
          onClick={handleCollections}
          size="large"
        >
          Explore Collections
        </Button>
      </Box>

      

      {/* FEATURES SECTION */}
      <Box sx={{my: 5}}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                background: "linear-gradient(to bottom right, #000000, #434343)", // Gradient black
                color: "white", // Text color
                textAlign: "center",
                height: "100%",
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
              }}
            >
              <Typography variant="h6" gutterBottom>
                Effortless Input
              </Typography>
              <Typography color="rgba(255, 255, 255, 0.7)"> {/* Semi-transparent white */}
                Enter your text effortlessly and generate flashcards with ease.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                background: "linear-gradient(to bottom right, #000000, #434343)", // Gradient black
                color: "white", // Text color
                textAlign: "center",
                height: "100%",
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
              }}
            >
              <Typography variant="h6" gutterBottom>
                Intelligent Design
              </Typography>
              <Typography color="rgba(255, 255, 255, 0.7)"> {/* Semi-transparent white */}
                Our AI transforms your text into smart flashcards for effective studying.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                background: "linear-gradient(to bottom right, #000000, #434343)", // Gradient black
                color: "white", // Text color
                textAlign: "center",
                height: "100%",
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
              }}
            >
              <Typography variant="h6" gutterBottom>
                Accessible Anywhere
              </Typography>
              <Typography color="rgba(255, 255, 255, 0.7)"> {/* Semi-transparent white */}
                Study on the go with access from any device, anywhere.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>


      {/* PRICING SECTION */}
      <Box sx={{ my: 10, textAlign: "center",}}>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            fontWeight: 600, 
            letterSpacing: "0.02em", // Slightly tighter letter spacing for a refined look
            color: "#000" // Darker color for the title 
          }}>
          Choose Your Plan
        </Typography>
        <Typography 
          variant="h6" 
          color="textSecondary" 
          gutterBottom 
          sx={{ 
            mb: 5,         
          }}
        >
          Select the plan that suits you best
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {/* Basic Plan */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              elevation={6}
              sx={{
                p: 4,
                borderRadius: 3,
                transition: "transform 0.3s ease", // Subtle hover effect
                "&:hover": {
                  transform: "scale(1.05)",
                }
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 400, mb: 2 }} >
                Basic
              </Typography>
              <Typography color="textSecondary" gutterBottom sx={{ mb: 4 }}>
                Essential features with limited storage
              </Typography>
              <Typography variant="h4" color="#000" gutterBottom sx={{ mb: 2, fontWeight: "bold"}}>
                $0 / month
              </Typography>
              <Typography color="textSecondary" >
                50 flashcards only
              </Typography>
              <Typography color="textSecondary" sx={{ mb: 3 }}>
                Basic Study Modes
              </Typography>
              <Button
                variant="contained"
                sx={{ 
                  mt: 4, 
                  background: "#000",
                  borderColor: "#000",
                  color: "#fff",
                  borderRadius: 3,
                  "&:hover": {
                    borderColor: "#000",
                    background: "#333333" // Darker shade on hover
                  }
                }}
                //onClick={() => handleCheckout("basic")}
                onClick={() => router.push("/sign-up")}
              >
                Select Basic
              </Button>
            </Paper>
          </Grid>

          {/* Pro Plan */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              elevation={6}
              sx={{
                p: 4,
                borderRadius: 3,
                transition: "transform 0.3s ease", // Subtle hover effect
                "&:hover": {
                  transform: "scale(1.05)",
                }
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 400, mb: 2 }} >
                Premium
              </Typography>
              <Typography color="textSecondary" gutterBottom sx={{ mb: 4 }}>
                Unlock more cool features
              </Typography>
              <Typography variant="h4" color="#000" gutterBottom sx={{ mb: 2, fontWeight: "bold"}}>
                $10 / month
              </Typography>
              <Typography color="textSecondary" >
                Unlimited flashcards
              </Typography>
              <Typography color="textSecondary" sx={{ mb: 3 }}>
                Advanced Study Modes
              </Typography>
              <Button
                variant="contained"
                sx={{ 
                  mt: 4, 
                  background: "#000",
                  borderColor: "#000",
                  color: "#fff",
                  borderRadius: 3,
                  "&:hover": {
                    borderColor: "#000",
                    background: "#333333" // Darker shade on hover
                  }
                }}
                onClick={() => handleCheckout("pro")}
              >
                Select Pro
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>



       {/* FAQ SECTION */}
       <Box sx={{ my: 10 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: 600, mb: 4, textAlign: "center" }}
        >
          Frequently Asked Questions
        </Typography>
        
        {/* Question 1 */}
        <Accordion sx={{ mb: 2, boxShadow: "none" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">What is Flashcard Generator?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Flashcard Generator is a platform that allows users to convert text into study-friendly flashcards. It helps in organizing and memorizing information effectively.
            </Typography>
          </AccordionDetails>
        </Accordion>
        
        {/* Question 2 */}
        <Accordion sx={{ mb: 2, boxShadow: "none" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">How do I sign up?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              To sign up, click on the {'"'}Sign In{'"'} button in the top-right corner of the page. If you don{"'"}t have an account, you{"'"}ll be able to create one from there.
            </Typography>
          </AccordionDetails>
        </Accordion>
        
        {/* Question 3 */}
        <Accordion sx={{ mb: 2, boxShadow: "none" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Can I cancel my subscription?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Yes, you can cancel your subscription at any time from your account settings. Your access will continue until the end of the current billing cycle.
            </Typography>
          </AccordionDetails>
        </Accordion>
        
        {/* Question 4 */}
        <Accordion sx={{ mb: 2, boxShadow: "none" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">How do I contact support?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              You can contact support by clicking on the {'"'}Help{'"'} button located in your account menu. Alternatively, you can email us at support@flashcardgenerator.com.
            </Typography>
          </AccordionDetails>
        </Accordion>
        
        {/* Question 5 */}
        <Accordion sx={{ mb: 2, boxShadow: "none" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">What payment methods are accepted?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              We accept all major credit cards and debit cards. Payment is processed securely through our payment provider.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
}
