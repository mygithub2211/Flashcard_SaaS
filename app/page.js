'use client'

import getStripe from '@/utils/get-stripe'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
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
} from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/navigation'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export default function Home() {
  const router = useRouter()

  const handleCheckout = async (plan) => {
    try {
      const checkoutSession = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: {
          origin: 'http://localhost:3000',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan }),
      })

      const checkoutSessionJson = await checkoutSession.json()

      if (checkoutSession.statusCode === 500) {
        console.error(checkoutSessionJson.message)
        return
      }

      const stripe = await getStripe()
      const { error } = await stripe.redirectToCheckout({
        sessionId: checkoutSessionJson.id,
      })

      if (error) {
        console.warn(error.message)
      }
    } catch (err) {
      console.error('Error during checkout:', err)
    }
  }

  const handleGetStarted = () => {
    router.push('/generate')
  }

  const handleCollections = () => {
    router.push('/flashcards')
  }

  return (
    <Container maxWidth='lg'>
      <Head>
        <title>Flashcard SaaS</title>
        <meta name='description' content='Create flashcards from your text' />
      </Head>

      {/* header */}
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant='h6' sx={{ fontWeight: 'bold', cursor: 'pointer' }}>
          FlashCards
        </Typography>

        <Box>
          <SignedOut>
            <Button
              variant='outlined'
              color='inherit'
              href='/sign-in'
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

      <Divider />

      {/* big title section */}
      <Box sx={{ textAlign: 'center', py: 6, mt: 5 }}>
        <Typography variant='h2' gutterBottom align='center'>
          <span style={{
            display: 'block',
            fontWeight: 700,
            fontSize: '4rem',
            background: 'linear-gradient(to bottom right, #000000, #434343)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            letterSpacing: '0.05em',
            marginBottom: '0.5rem',
            dropShadow: '2px 2px 2px rgba(0, 0, 0, 0.5)',
          }}>
            Flashcards Generator
          </span>

          <span style={{
            display: 'block',
            fontWeight: 700,
            fontSize: '4rem',
            background: 'linear-gradient(to bottom right, #000000, #434343)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            letterSpacing: '0.05em',
            marginBottom: '0.5rem',
            dropShadow: '2px 2px 2px rgba(0, 0, 0, 0.5)',
          }}>
            A Great Learning Platform
          </span>
        </Typography>

        <Typography
          variant='h5'
          color='textSecondary'
          gutterBottom
          sx={{ mt: 2 }}
        >
          Transform your text into smart, study-friendly flashcards.
        </Typography>

        <Button
          variant='contained'
          sx={{
            mt: 4,
            mx: 2,
            borderRadius: 3,
            background: 'linear-gradient(to bottom right, #000000, #434343)',
          }}
          onClick={handleGetStarted}
          size='large'
        >
          Get Started
        </Button>

        <Button
          variant='outlined'
          sx={{
            mt: 4,
            mx: 2,
            borderRadius: 3,
            borderColor: '#000',
            color: '#000',
            '&:hover': {
              borderColor: '#000',
              background: '#f0f0f0',
              color: '#000',
            },
          }}
          onClick={handleCollections}
          size='large'
        >
          Explore Collections
        </Button>
      </Box>

      {/* feature section */}
      <Box sx={{ my: 5 }}>
        <Grid container spacing={4}>
          {[
            { title: 'Effortless Input', desc: 'Enter your text effortlessly and generate flashcards with ease.' },
            { title: 'Intelligent Design', desc: 'Our AI transforms your text into smart flashcards for effective studying.' },
            { title: 'Accessible Anywhere', desc: 'Study on the go with access from any device, anywhere.' },
          ].map((item, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  background: 'linear-gradient(to bottom right, #000000, #434343)',
                  color: 'white',
                  textAlign: 'center',
                  height: '100%',
                  borderRadius: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Typography variant='h6' gutterBottom>{item.title}</Typography>
                <Typography color='rgba(255, 255, 255, 0.7)'>{item.desc}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* plan section */}
      <Box sx={{ my: 10, textAlign: 'center' }}>
        <Typography
          variant='h4'
          gutterBottom
          sx={{ fontWeight: 600, letterSpacing: '0.02em', color: '#000' }}
        >
          Choose Your Plan
        </Typography>

        <Typography
          variant='h6'
          color='textSecondary'
          gutterBottom
          sx={{ mb: 5 }}
        >
          Select the plan that suits you best
        </Typography>

        <Grid container spacing={4} justifyContent='center'>
          {/* basic plan */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              elevation={6}
              sx={{
                p: 4,
                borderRadius: 3,
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'scale(1.05)' },
              }}
            >
              <Typography variant='h4' sx={{ fontWeight: 400, mb: 2 }}>
                Basic
              </Typography>
              <Typography color='textSecondary' gutterBottom sx={{ mb: 4 }}>
                Essential features with limited storage
              </Typography>
              <Typography variant='h4' color='#000' gutterBottom sx={{ mb: 2, fontWeight: 'bold' }}>
                $0 / month
              </Typography>
              <Typography color='textSecondary'>50 flashcards only</Typography>
              <Typography color='textSecondary' sx={{ mb: 3 }}>Basic Study Modes</Typography>

              <Button
                variant='contained'
                sx={{
                  mt: 4,
                  background: '#000',
                  borderColor: '#000',
                  color: '#fff',
                  borderRadius: 3,
                  '&:hover': {
                    background: '#333333',
                  },
                }}
                onClick={() => router.push('/sign-up')}
              >
                Select Basic
              </Button>
            </Paper>
          </Grid>

          {/* pro plan */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              elevation={6}
              sx={{
                p: 4,
                borderRadius: 3,
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'scale(1.05)' },
              }}
            >
              <Typography variant='h4' sx={{ fontWeight: 400, mb: 2 }}>
                Premium
              </Typography>
              <Typography color='textSecondary' gutterBottom sx={{ mb: 4 }}>
                Unlock more cool features
              </Typography>
              <Typography variant='h4' color='#000' gutterBottom sx={{ mb: 2, fontWeight: 'bold' }}>
                $10 / month
              </Typography>
              <Typography color='textSecondary'>Unlimited flashcards</Typography>
              <Typography color='textSecondary' sx={{ mb: 3 }}>Advanced Study Modes</Typography>

              <Button
                variant='contained'
                sx={{
                  mt: 4,
                  background: '#000',
                  borderColor: '#000',
                  color: '#fff',
                  borderRadius: 3,
                  '&:hover': {
                    background: '#333333',
                  },
                }}
                onClick={() => handleCheckout('pro')}
              >
                Select Pro
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* faq section */}
      <Box sx={{ my: 10 }}>
        <Typography variant='h4' gutterBottom sx={{ fontWeight: 600, mb: 4, textAlign: 'center' }}>
          Frequently Asked Questions
        </Typography>

        {[
          {
            q: 'What is Flashcard Generator?',
            a: 'Flashcard Generator is a platform that allows users to convert text into study-friendly flashcards. It helps in organizing and memorizing information effectively.',
          },
          {
            q: 'How do I sign up?',
            a: `To sign up, click on the 'Sign In' button in the top-right corner of the page. If you don't have an account, you'll be able to create one from there.`,
          },
          {
            q: 'Can I cancel my subscription?',
            a: 'Yes, you can cancel your subscription at any time from your account settings. Your access will continue until the end of the current billing cycle.',
          },
          {
            q: 'How do I contact support?',
            a: `You can contact support by clicking on the 'Help' button located in your account menu. Alternatively, you can email us at support@flashcardgenerator.com.`,
          },
          {
            q: 'What payment methods are accepted?',
            a: 'We accept all major credit cards and debit cards. Payment is processed securely through our payment provider.',
          },
        ].map((item, idx) => (
          <Accordion key={idx} sx={{ mb: 2, boxShadow: 'none' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant='h6'>{item.q}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{item.a}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  )
}
