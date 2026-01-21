import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useState } from "react";

export default function ShopProducts() {
  const [sortAnchor, setSortAnchor] = useState<null | HTMLElement>(null);
  const [sortOption, setSortOption] = useState("Featured");

  const handleSortClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSortAnchor(event.currentTarget);
  };

  const handleSortClose = (option?: string) => {
    if (option) setSortOption(option);
    setSortAnchor(null);
  };

  // Example products array (can be dynamic from API)
  const products = [...Array(12)].map((_, i) => ({
    id: i,
    name: "Premium Pet Product",
    category: "Accessories",
    rating: 4,
    reviews: 124,
    price: 24.99 + i, // example price
    oldPrice: 32.99,
    img: `/images/pet-${(i % 4) + 1}.jpg`,
    seen: 100 + i,
    date: new Date(2025, 0, 12 - i),
  }));

  // SORT PRODUCTS BASED ON OPTION
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortOption) {
      case "Price: Low → High":
        return a.price - b.price;
      case "Price: High → Low":
        return b.price - a.price;
      case "Most Seen":
        return b.seen - a.seen;
      case "Newest":
        return b.date.getTime() - a.date.getTime();
      default:
        return 0;
    }
  });

  return (
    <Container maxWidth={false} sx={{ maxWidth: 1300, px: 0, mt: 5 }}>
      {/* HEADER */}
      <Box mb={4}>
        <Typography variant="h5" fontWeight={700}>
          Shop All Products
        </Typography>
        <Typography color="text.secondary" fontSize={14}>
          Discover the best products for your pets
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* ================= FILTER SIDEBAR ================= */}
        <Grid item xs={12} md={3}>
          <Box
            sx={{
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              p: 2.5,
              backgroundColor: "#fff",
            }}
          >
            <Typography fontWeight={700} mb={2}>
              Filters
            </Typography>

            {/* CATEGORY */}
            <Box mb={3}>
              <Typography fontWeight={600} fontSize={14} mb={1}>
                Category
              </Typography>
              {["Food", "Toys", "Accessories", "Treats"].map((item) => (
                <Stack
                  key={item}
                  direction="row"
                  alignItems="center"
                  spacing={1}
                >
                  <Checkbox size="small" />
                  <Typography fontSize={13}>{item}</Typography>
                </Stack>
              ))}
            </Box>

            <Divider />

            {/* PET TYPE */}
            <Box my={3}>
              <Typography fontWeight={600} fontSize={14} mb={1}>
                Pet Type
              </Typography>
              {["Dogs", "Cats", "Birds", "Fish", "Small Pets"].map((item) => (
                <Stack
                  key={item}
                  direction="row"
                  alignItems="center"
                  spacing={1}
                >
                  <Checkbox size="small" />
                  <Typography fontSize={13}>{item}</Typography>
                </Stack>
              ))}
            </Box>

            <Divider />
          </Box>
        </Grid>

        {/* ================= PRODUCTS GRID ================= */}
        <Grid item xs={12} md={9}>
          {/* TOP BAR */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography fontSize={14} color="text.secondary">
              Showing {products.length} products
            </Typography>

            <Button
              size="small"
              variant="outlined"
              sx={{ borderRadius: "8px", fontSize: 13 }}
              onClick={handleSortClick}
            >
              {sortOption}
            </Button>

            {/* SORT MENU */}
            <Menu
              anchorEl={sortAnchor}
              open={Boolean(sortAnchor)}
              onClose={() => handleSortClose()}
            >
              {[
                "Price: Low → High",
                "Price: High → Low",
                "Most Seen",
                "Newest",
              ].map((option) => (
                <MenuItem key={option} onClick={() => handleSortClose(option)}>
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </Stack>

          {/* PRODUCTS GRID */}
          <Grid container spacing={3}>
            {sortedProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Box
                  sx={{
                    bgcolor: "white",
                    borderRadius: 2,
                    border: "1px solid #e5e7eb",
                    overflow: "hidden",
                    "&:hover": { boxShadow: 3 },
                    transition: "0.3s",
                  }}
                >
                  {/* IMAGE */}
                  <Box sx={{ height: 192, bgcolor: "grey.100" }}>
                    <img
                      src={product.img}
                      alt="product"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>

                  {/* CONTENT */}
                  <Box sx={{ p: 2 }}>
                    <Typography fontSize={11} color="text.secondary" mb={0.5}>
                      {product.category}
                    </Typography>

                    <Typography fontWeight={600} fontSize={14}>
                      {product.name}
                    </Typography>

                    {/* RATING */}
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={0.5}
                      mt={1}
                    >
                      {[...Array(product.rating)].map((_, i) => (
                        <StarIcon
                          key={i}
                          sx={{ fontSize: 14, color: "#f59e0b" }}
                        />
                      ))}
                      <Typography fontSize={12} color="text.secondary">
                        ({product.reviews})
                      </Typography>
                    </Stack>

                    {/* PRICE */}
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      mt={1}
                    >
                      <Typography fontWeight={700} color="error">
                        ${product.price.toFixed(2)}
                      </Typography>
                      <Typography
                        fontSize={12}
                        color="text.secondary"
                        sx={{ textDecoration: "line-through" }}
                      >
                        ${product.oldPrice.toFixed(2)}
                      </Typography>
                    </Stack>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
