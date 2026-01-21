import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PublicIcon from "@mui/icons-material/Public";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import VerifiedIcon from "@mui/icons-material/Verified";

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
    title: "Why Dogs Bite and Destroy Furniture and How to Prevent",
    description:
      "Dog bites are common during development. No one wants to see...",
    img: "/img/dog-bite.png",
  },
];

export default function UsefulKnowledge() {
  return (
    <section className="bg-white">
      <Container className="py-20" sx={{ mt: 5, mb: 8 }}>
        {/* Header */}
        <div className="mb-12">
          <Typography variant="h4" fontWeight={600}>
            Useful Pet Knowledge
          </Typography>
          <p className="text-slate-500 mt-2 max-w-xl">
            Practical tips, expert guides, and insights to help you care for
            your pets better every day.
          </p>
        </div>

        {/* Articles */}
        <Grid container spacing={4}>
          {articles.map((article, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <a href={`/articles/${index}`} className="block h-full">
                <Card className="h-full rounded-xl border border-slate-200 shadow-none hover:shadow-md transition">
                  <CardMedia
                    component="img"
                    height="200"
                    image={article.img}
                    alt={article.title}
                  />

                  <CardContent className="p-5 flex flex-col gap-3">
                    <span className="text-xs font-medium text-slate-500">
                      {article.tag}
                    </span>

                    <Typography variant="h6">{article.title}</Typography>

                    <Typography variant="body2" className="text-slate-600">
                      {article.description.substring(0, 90)}...
                    </Typography>

                    <div className="mt-auto flex items-center gap-1 text-sm text-slate-700 font-medium">
                      Read more
                      <ArrowForwardIcon fontSize="small" />
                    </div>
                  </CardContent>
                </Card>
              </a>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Box
        sx={{
          backgroundColor: "#f8fafc",
          py: { xs: 4, md: 6 },
          mt: 6,
        }}
      >
        <Container maxWidth="lg">
          {/* Title */}
          <Stack spacing={1} textAlign="center" mb={7}>
            <Box
              sx={{
                fontSize: "22px",
                fontWeight: 700,
                color: "#0f172a",
              }}
            >
              Proud to be part of Pet Sellers
            </Box>

            <Box
              sx={{
                fontSize: "14px",
                color: "#64748b",
                cursor: "pointer",
                "&:hover": { color: "#2563eb" },
              }}
            >
              View all our sellers →
            </Box>
          </Stack>

          {/* Brand logos */}
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
            gap={4}
          >
            {[
              "/icons/whiskas.svg",
              "/icons/brand_butcher.svg",
              "/icons/brand_felix.svg",
              "/icons/brand_pedigree.svg",
              "/icons/brand_pedigree.svg",
              "/icons/brand_pedigree.svg",
            ].map((logo, index) => (
              <Box
                key={index}
                sx={{
                  width: 110,
                  height: 60,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#ffffff",
                  borderRadius: "14px",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
                  },
                }}
              >
                <img
                  src={logo}
                  alt={`Brand ${index + 1}`}
                  style={{
                    maxWidth: "80%",
                    maxHeight: "40px",
                    objectFit: "contain",
                  }}
                />
              </Box>
            ))}
          </Stack>
        </Container>
      </Box>
    </section>
  );
}

/* Small helper */
function InfoRow({ icon, title, text }: any) {
  return (
    <div className="flex items-start gap-4">
      <div className="text-blue-600">{icon}</div>
      <div>
        <p className="font-semibold text-slate-900">{title}</p>
        <p className="text-slate-600">{text}</p>
      </div>
    </div>
  );
}
