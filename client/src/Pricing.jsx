import React, {useEffect} from "react";
import {Box, Typography, Card, CardContent, Button, Grid} from "@mui/material";

const plans = [
    {
        title: "Free",
        price: "$0",
        features: ["Basic Templates", "Limited AI Assistance", "Watermark included"],
        color: "#fff",
    },
    {
        title: "Silver",
        price: "$9/mo",
        features: ["Advanced Templates", "AI-Powered Slides", "Email Support", "Watermark Not included"],
        color: "#ff75ba",
    },
    {
        title: "Gold",
        price: "$19/mo",
        features: ["Premium Templates", "Unlimited AI Slides", "Priority Support", "Watermark Not included"],
        color: "#ff148a",
        
    },
];

function Pricing({ setPage }) {
    useEffect(() => {
        setPage("pricing");
    }, [setPage]);

    return (
        <Box
            className="page"
            sx={{
                width: "100%",
                height: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                backgroundColor: "#000",
                paddingBottom: "30px"
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%"
                }}
            >
                <Typography
                    variant="h3"
                    align="center"
                    sx={{
                        margin: "0px 5px",
                        marginTop: "150px",
                        color: "#ff75ba",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        marginBottom: "30px"
                    }}
                >
                    Choose Your Plan
                </Typography>

                <Grid container spacing={3} justifyContent="center" alignItems="center">
                    {plans.map((plan, index) => (
                        <Grid sx={{gridColumn: {xs: "span 12", sm: "span 6", md: "span 4"}}} key={index}>
                            <Card
                                sx={{
                                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                                    borderRadius: "12px",
                                    boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.2)",
                                    backdropFilter: "blur(8px)",
                                    textAlign: "center",
                                    padding: "20px",
                                    transition: "0.3s",
                                    "&:hover": {transform: "scale(1.05)"}
                                }}
                            >
                                <CardContent>
                                    <Typography
                                        variant="h4"
                                        sx={{color: plan.color, fontWeight: "bold", marginBottom: "10px"}}
                                    >
                                        {plan.title}
                                    </Typography>

                                    <Typography
                                        variant="h5"
                                        sx={{color: "#fff", fontWeight: "500", marginBottom: "15px"}}
                                    >
                                        {plan.price}
                                    </Typography>

                                    <Box sx={{color: "#ccc", marginBottom: "20px", textAlign: "left", paddingLeft: "20px"}}>
                                        {plan.features.map((feature, i) => (
                                            <Typography key={i} variant="body1" sx={{marginBottom: "5px", display: "flex", alignItems: "center"}}>
                                                • {feature}
                                            </Typography>
                                        ))}
                                    </Box>

                                    <Button
                                        variant="contained"
                                        sx={{
                                            background: plan.color,
                                            color: "#000",
                                            fontWeight: "bold",
                                            textTransform: "uppercase",
                                            borderRadius: "8px",
                                            padding: "10px 20px",
                                            "&:hover": {opacity: 0.9},
                                        }}
                                    >
                                        Select Plan
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}

export default Pricing;
