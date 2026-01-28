import React, { ChangeEvent, useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import FilterListIcon from "@mui/icons-material/FilterList";

import { useDispatch, useSelector } from "react-redux";
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { retrieveProducts } from "./selector";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import DiscountHero from "./DiscountHero";

enum PetType {
  DOG = "DOG",
  CAT = "CAT",
  BIRD = "BIRD",
  FISH = "FISH",
  SMALL_PET = "SMALL_PET",
}

interface ProductsProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
}

/** REDUX */
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

export default function Products(props: ProductsProps) {
  const { onAdd } = props;
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);
  const history = useHistory();

  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCollection: ProductCollection.FOOD,
    search: "",
  });

  const [searchText, setSearchText] = useState("");
  const [selectedPetType, setSelectedPetType] = useState<PetType>(PetType.DOG);

  useEffect(() => {
    const product = new ProductService();
    product.getProducts(productSearch).then(setProducts).catch(console.log);
  }, [productSearch]);

  const searchCollectionHandler = (collection: ProductCollection) => {
    setProductSearch({
      ...productSearch,
      page: 1,
      productCollection: collection,
    });
  };

  const searchOrderHandler = (order: string) => {
    setProductSearch({
      ...productSearch,
      page: 1,
      order,
    });
  };

  const searchProductHandler = () => {
    setProductSearch({
      ...productSearch,
      page: 1,
      search: searchText,
    });
  };

  /** ✅ FIXED: Pet type filter now updates productSearch */
  const petTypeHandler = (type: PetType) => {
    setSelectedPetType(type);
    setProductSearch({
      ...productSearch,
      page: 1,
      search: type, // This will filter by pet type
    });
  };

  const paginationHandler = (_: ChangeEvent<any>, value: number) => {
    setProductSearch({
      ...productSearch,
      page: value,
    });
  };

  /** ✅ FIXED CLEAR HANDLER */
  const clearAllFiltersHandler = () => {
    setSearchText("");
    setSelectedPetType(PetType.DOG);

    setProductSearch({
      page: 1,
      limit: 8,
      order: "createdAt",
      productCollection: ProductCollection.FOOD,
      search: "",
    });
  };

  return (
    <>
      <DiscountHero />
      <div className="w-full mb-32">
        <div className="max-w-[1300px] mx-auto px-4 mt-10">
          {/* HEADER */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold">Shop All Products</h2>
            <p className="text-sm text-gray-500">
              Discover the best products for your pets
            </p>
          </div>

          {/* SORT */}
          <div className="flex justify-between items-center mb-8">
            <p className="text-sm text-gray-500">
              Showing {products.length} products
            </p>

            <div className="flex gap-2">
              {[
                { label: "Newest", value: "createdAt" },
                { label: "Price", value: "productPrice" },
                { label: "Views", value: "productViews" },
              ].map((item) => (
                <button
                  key={item.value}
                  onClick={() => searchOrderHandler(item.value)}
                  className={`px-4 py-2 rounded-lg text-sm border transition ${
                    productSearch.order === item.value
                      ? "bg-blue-600 text-white border-blue-600"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* ✅ IMPROVED FILTERS SIDEBAR */}
            <div className="md:col-span-3">
              <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100 rounded-2xl p-6 shadow-sm space-y-8 sticky top-4">
                {/* Header with icon */}
                <div className="flex items-center gap-2 pb-4 border-b border-blue-200">
                  <FilterListIcon className="text-blue-600" />
                  <h3 className="font-bold text-lg text-gray-800">Filters</h3>
                </div>

                {/* SEARCH */}
                <div>
                  <p className="text-sm font-semibold mb-3 text-gray-700">
                    Search Products
                  </p>
                  <div className="flex gap-2">
                    <input
                      className="w-full border-2 border-gray-200 focus:border-blue-400 rounded-lg px-4 py-2.5 text-sm transition outline-none"
                      placeholder="Search products..."
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && searchProductHandler()
                      }
                    />
                    <button
                      onClick={searchProductHandler}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-lg transition font-medium"
                    >
                      Go
                    </button>
                  </div>
                </div>

                {/* PET TYPE */}
                <div>
                  <p className="text-sm font-semibold mb-3 text-gray-700">
                    Pet Type
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {Object.values(PetType).map((type) => (
                      <button
                        key={type}
                        onClick={() => petTypeHandler(type)}
                        className={`px-4 py-2 rounded-full text-xs font-medium border-2 transition ${
                          selectedPetType === type
                            ? "bg-blue-600 text-white border-blue-600 shadow-md"
                            : "bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                        }`}
                      >
                        {type.replace("_", " ")}
                      </button>
                    ))}
                  </div>
                </div>

                {/* CATEGORY */}
                <div>
                  <p className="text-sm font-semibold mb-3 text-gray-700">
                    Category
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.values(ProductCollection).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => searchCollectionHandler(cat)}
                        className={`py-2.5 rounded-lg text-xs font-medium border-2 transition ${
                          productSearch.productCollection === cat
                            ? "bg-blue-600 text-white border-blue-600 shadow-md"
                            : "bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* CLEAR */}
                <button
                  onClick={clearAllFiltersHandler}
                  className="w-full border-2 border-gray-300 hover:border-red-400 hover:bg-red-50 hover:text-red-600 py-2.5 rounded-lg text-sm font-medium transition"
                >
                  Clear all filters
                </button>
              </div>
            </div>

            {/* ✅ IMPROVED PRODUCTS GRID - Better spacing and sizing */}
            <div className="md:col-span-9">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;

                  return (
                    <div
                      key={product._id}
                      onClick={() => history.push(`/products/${product._id}`)}
                      className="
                        group relative
                        bg-white
                        border border-blue-100
                        rounded-3xl
                        p-5
                        cursor-pointer
                        transition-all duration-300
                        hover:-translate-y-2
                        hover:shadow-2xl
                        w-full
                        max-w-[280px]
                        mx-auto
                      "
                    >
                      {/* IMAGE */}
                      <div className="relative w-full h-[220px] rounded-2xl overflow-hidden bg-blue-50">
                        <img
                          src={imagePath}
                          alt={product.productName}
                          className="
                            absolute bottom-0 left-0
                            w-full h-full
                            object-cover
                            transition-transform duration-500
                            group-hover:scale-105
                          "
                        />

                        {/* CATEGORY BADGE */}
                        <span
                          className="
                            absolute top-3 left-3
                            bg-blue-600 text-white
                            text-xs font-semibold
                            px-3 py-1 rounded-full
                            z-10
                          "
                        >
                          {product.productCollection}
                        </span>
                      </div>

                      {/* CONTENT */}
                      <div className="mt-4">
                        <h3 className="font-semibold text-base text-gray-800 truncate">
                          {product.productName}
                        </h3>

                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          Premium quality product for your pet
                        </p>

                        <div className="flex justify-between items-center mt-4">
                          <p className="text-xl font-bold text-blue-600">
                            ${product.productPrice}
                          </p>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onAdd({
                                _id: product._id,
                                name: product.productName,
                                price: product.productPrice,
                                image: product.productImages[0],
                                quantity: 1,
                              });
                            }}
                            className="
                              opacity-0 group-hover:opacity-100
                              transition
                              bg-blue-600 hover:bg-blue-700
                              text-white
                              px-4 py-2
                              rounded-full
                              text-xs font-medium
                            "
                          >
                            Add to cart
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* PAGINATION */}
              <div className="mt-16 flex justify-center">
                <Pagination
                  page={productSearch.page}
                  onChange={paginationHandler}
                  renderItem={(item) => (
                    <PaginationItem
                      components={{
                        previous: ArrowBackIcon,
                        next: ArrowForwardIcon,
                      }}
                      {...item}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
