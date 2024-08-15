"use client"
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { collection, doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "@/firebase"
import { useRouter } from "next/navigation"
import { Card, CardActionArea, CardContent, Container, Grid, Typography, Box, Toolbar, AppBar, Button } from "@mui/material"

export default function Flashcards() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const router = useRouter()

    useEffect(() => {
        async function getFlashcards() {
            if (!user) return
            const docRef = doc(collection(db, "users"), user.id)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                const collections = docSnap.data().flashcards || []
                setFlashcards(collections)
            } else {
                await setDoc(docRef, { flashcards: [] })
            }
        }
        getFlashcards()
    }, [user])

    if (!isLoaded || !isSignedIn) {
        return <></>
    }

    const handleCardClick = (id) => {
        router.push(`/flashcard?id=${id}`)
    }

    return (
        <Container maxWidth="lg">
            {/* TITLE BAR */}
           <AppBar position="static" sx={{ bgcolor: "primary.main", color: "white" }}>
                <Toolbar sx={{ justifyContent: "space-between"}}>               
                    <Typography variant="h4">
                        My Flashcards
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
            <Grid
                container
                spacing={3}
                sx={{ mt: 1 }}
            >
                {flashcards.length > 0 ? (
                    flashcards.map((flashcard, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card
                                sx={{
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                                    borderRadius: 2,
                                    transition: "transform 0.3s ease",
                                    "&:hover": {
                                        transform: "translateY(-5px)",
                                    },
                                }}
                            >
                                <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                                    <CardContent>
                                        <Typography variant="h6" fontWeight="bold">
                                            {flashcard.name}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "50vh",
                            textAlign: "center",
                            ml: 20
                        }}
                    >
                        <Typography variant="h4" color="textSecondary" sx={{ mb: 2 }}>
                            No flashcards available. Start by creating a new flashcard.
                        </Typography>
                        <Button variant="contained" onClick={() => router.push("/generate")}>
                            Generate
                        </Button>
                    </Box>
                )}
            </Grid>
        </Container>
    )
}
