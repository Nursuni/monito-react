import React from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Stack,
  Box,
} from "@mui/material";

const articles = [
  {
    tag: "Pet knowledge",
    title: "What is a Pomeranian? How to Identify Pomeranian Dogs",
    description:
      "The Pomeranian, also known as the Pom dog, is always in the top of the cutest pets. Small, lovely, smart, friendly, and skillful...",
    img: "/img/pomeranian.png",
  },
  {
    tag: "Pet knowledge",
    title: "Dog Diet You Need To Know",
    description:
      "Dividing a dog's diet may seem simple at first, but there are some rules you should know so your dog can absorb nutrients easily...",
    img: "/img/dog-diet.png",
  },
  {
    tag: "Pet knowledge",
    title:
      "Why Dogs Bite and Destroy Furniture and How to Prevent It Effectively",
    description:
      "Dog bites are common during development. No one wants to see furniture or important items being bitten by a dog...",
    img: "/img/dog-bite.png",
  },
];

export default function UsefulKnowledge() {
  return (
    <Container sx={{ mt: 8, mb: 8 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h4" fontWeight="bold">
          Useful Pet Knowledge
        </Typography>
        <Button variant="text">View more &gt;</Button>
      </Stack>

      <Grid container spacing={4}>
        {articles.map((article, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              {article.img && (
                <CardMedia
                  component="img"
                  height="180"
                  image={article.img}
                  alt={article.title}
                />
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  gutterBottom
                >
                  {article.tag}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {article.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {article.description.length > 100
                    ? article.description.substring(0, 100) + "..."
                    : article.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <div className={"address"}>
        <Container>
          <Stack className={"address-area"}>
            <Box className={"category-title"}>Our address</Box>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.5262489589635!2d69.28586867611149!3d41.34119147127584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8d660b2bd55d%3A0xd86dc4c9715c2025!2sYunusabad%20District%2C%20Tashkent%2C%20Uzbekistan!5e0!3m2!1sen!2sus!4v1731707776783!5m2!1sen!2sus"
              width="1320"
              height="500"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Stack>
        </Container>
      </div>
    </Container>
  );
}
