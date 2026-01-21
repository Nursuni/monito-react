// import PetsIcon from "@mui/icons-material/Pets";
// import RestaurantIcon from "@mui/icons-material/Restaurant";
// import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
// import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
// import CategoryIcon from "@mui/icons-material/Category";
// import SearchIcon from "@mui/icons-material/Search";
// import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
// import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
// import Badge from "@mui/material/Badge";
// import { Box, Button, Stack } from "@mui/material";

// export default function ProductsCollection() {
//   function setSearchText(value: string): void {
//     throw new Error("Function not implemented.");
//   }

//   function searchProductHandler(): void {
//     throw new Error("Function not implemented.");
//   }

//   function searchOrderHandler(value: string): void {
//     throw new Error("Function not implemented.");
//   }

//   return (
//     <Stack direction="row" spacing={4} alignItems="flex-start" sx={{ mt: 4 }}>
//       {/* ================= LEFT SIDEBAR ================= */}
//       <Stack
//         sx={{
//           width: 260,
//           backgroundColor: "#f8fafc",
//           borderRadius: "18px",
//           padding: 2.5,
//           border: "1px solid #e5e7eb",
//           position: "sticky",
//           top: 100,
//         }}
//         spacing={3}
//       >
//         {/* SEARCH */}
//         <Box>
//           <Box fontWeight={700} mb={1}>
//             Search
//           </Box>
//           <input
//             type="search"
//             placeholder="Search products..."
//             value={searchText}
//             onChange={(e) => setSearchText(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && searchProductHandler()}
//             style={{
//               width: "100%",
//               padding: "10px 14px",
//               borderRadius: "12px",
//               border: "1px solid #e5e7eb",
//               outline: "none",
//             }}
//           />
//         </Box>

//         {/* SORT */}
//         <Box>
//           <Box fontWeight={700} mb={1}>
//             Sort by
//           </Box>
//           <Stack spacing={1}>
//             {[
//               { label: "New", value: "createdAt" },
//               { label: "Price", value: "productPrice" },
//               { label: "Views", value: "productViews" },
//             ].map((item) => (
//               <Button
//                 key={item.value}
//                 fullWidth
//                 variant={
//                   productSearch.order === item.value ? "contained" : "outlined"
//                 }
//                 onClick={() => searchOrderHandler(item.value)}
//                 sx={{
//                   justifyContent: "flex-start",
//                   textTransform: "none",
//                   borderRadius: "10px",
//                   fontWeight: 600,
//                 }}
//               >
//                 {item.label}
//               </Button>
//             ))}
//           </Stack>
//         </Box>

//         {/* CATEGORIES */}
//         <Box>
//           <Box fontWeight={700} mb={1}>
//             Categories
//           </Box>
//           <Stack spacing={1}>
//             {[
//               {
//                 label: "Food",
//                 value: ProductCollection.FOOD,
//                 icon: <RestaurantIcon />,
//               },
//               {
//                 label: "Treat",
//                 value: ProductCollection.TREAT,
//                 icon: <PetsIcon />,
//               },
//               {
//                 label: "Drink",
//                 value: ProductCollection.DRINK,
//                 icon: <LocalDrinkIcon />,
//               },
//               {
//                 label: "Accessory",
//                 value: ProductCollection.ACCESSORY,
//                 icon: <ShoppingBagIcon />,
//               },
//               {
//                 label: "Other",
//                 value: ProductCollection.OTHER,
//                 icon: <CategoryIcon />,
//               },
//             ].map((cat) => (
//               <Button
//                 key={cat.label}
//                 startIcon={cat.icon}
//                 fullWidth
//                 variant={
//                   productSearch.productCollection === cat.value
//                     ? "contained"
//                     : "outlined"
//                 }
//                 onClick={() => searchCollectionHandler(cat.value)}
//                 sx={{
//                   justifyContent: "flex-start",
//                   textTransform: "none",
//                   borderRadius: "10px",
//                   fontWeight: 600,
//                 }}
//               >
//                 {cat.label}
//               </Button>
//             ))}
//           </Stack>
//         </Box>
//       </Stack>

//       {/* ================= PRODUCTS ================= */}
//       <Stack className="product-wrapper grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 flex-1">
//         {/* YOUR EXISTING PRODUCT MAP HERE (UNCHANGED) */}
//       </Stack>
//     </Stack>
//   );
// }
