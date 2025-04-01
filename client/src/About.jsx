import React, {useEffect} from "react";
import {Box, Typography} from "@mui/material";

function About({ setPage }) {
    useEffect(() => {
        setPage("about");
    }, [setPage]);

    return (
        <Box
            className="page"
            sx={{
                width: "100%",
                height: "auto",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                overflowY: "auto"
            }}
        >
            <Box
                sx={{
                    margin: "100px 0px 20px 0px",
                    width: "20rem",
                    height: "20rem",
                    backgroundImage: "url(./NexlideLogo.png)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            ></Box>

            <Typography
                variant="h3"
                align="center"
                sx={{
                    color: "#ff75ba",
                    fontWeight: "bold",
                    marginBottom: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                }}
            >
                About Nexlide
            </Typography>

            <Typography
                variant="h5"
                align="center"
                sx={{
                    maxWidth: "800px",
                    color: "#e0e0e0",
                    lineHeight: "1.6",
                    fontWeight: "300",
                    margin: "0px 20px 40px 20px",
                }}
            >
                Nexlide is an AI-powered smart presentation generator designed to automate the 
                creation of professional and visually appealing PowerPoint presentations. It 
                provides structured content, AI-generated images, customizable layouts, and an 
                intuitive user experience.
            </Typography>

            <Box
                sx={{
                    width: "90%",
                    maxWidth: "900px",
                    textAlign: "center",
                    padding: "40px 20px",
                    background: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "12px",
                    backdropFilter: "blur(8px)",
                    boxShadow: "0px 4px 10px rgba(255, 115, 185, 0.2)",
                    margin: "0px 0px 50px 0px"
                }}
            >
                <Typography
                    variant="h3"
                    align="center"
                    sx={{
                        color: "#ff75ba",
                        fontWeight: "bold",
                        marginBottom: "10px",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                    }}
                >
                    Our Vision
                </Typography>

                <Typography
                    variant="h5"
                    align="center"
                    sx={{
                        color: "#e0e0e0",
                        fontWeight: "300",
                        lineHeight: "1.6",
                        maxWidth: "750px",
                        margin: "0 auto",
                    }}
                >
                    We aim to revolutionize the way presentations are created by making the 
                    process seamless, efficient, and visually captivating using AI.
                </Typography>
            </Box>

            <Box sx={{
                width: "100%",
                height: "40px",
                background: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Typography variant="body1" sx={{
                    color: "#000"
                }}>
                    Copyright 2025 © WeHateBugs
                </Typography>
            </Box>
        </Box>
    );
}

export default About;
