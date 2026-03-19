import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
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
const PET_EMOJI: Record<PetType, string> = {
  DOG: "🐶",
  CAT: "🐱",
  BIRD: "🐦",
  FISH: "🐠",
  SMALL_PET: "🐹",
};

interface ProductsProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
}

const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});
const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

/* ─── collapsible sidebar section ─── */
function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="fs-wrap">
      <button className="fs-header" onClick={() => setOpen(!open)}>
        <span className="fs-title">{title}</span>
        <span className={`fs-icon${open ? " open" : ""}`}>−</span>
      </button>
      {open && <div className="fs-body">{children}</div>}
    </div>
  );
}

/* ─── tilt card ─── */
function TiltCard({
  children,
  delay,
  onClick,
}: {
  children: React.ReactNode;
  delay: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    el.style.transform = `perspective(900px) rotateX(${(-y / height) * 8}deg) rotateY(${(x / width) * 8}deg) translateY(-4px) scale(1.02)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="pr-tilt"
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

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
  const [addedId, setAddedId] = useState<string | null>(null);

  useEffect(() => {
    new ProductService()
      .getProducts(productSearch)
      .then(setProducts)
      .catch(console.log);
  }, [productSearch]);

  const searchCollectionHandler = (c: ProductCollection) =>
    setProductSearch({ ...productSearch, page: 1, productCollection: c });
  const searchOrderHandler = (o: string) =>
    setProductSearch({ ...productSearch, page: 1, order: o });
  const searchProductHandler = () =>
    setProductSearch({ ...productSearch, page: 1, search: searchText });
  const petTypeHandler = (t: PetType) => {
    setSelectedPetType(t);
    setProductSearch({ ...productSearch, page: 1, search: t });
  };
  const paginationHandler = (_: ChangeEvent<any>, v: number) =>
    setProductSearch({ ...productSearch, page: v });
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
  const handleAdd = (e: React.MouseEvent, p: Product) => {
    e.stopPropagation();
    setAddedId(p._id);
    setTimeout(() => setAddedId(null), 800);
    onAdd({
      _id: p._id,
      name: p.productName,
      price: p.productPrice,
      image: p.productImages[0],
      quantity: 1,
    });
  };

  return (
    <div className="pr-root">
      <DiscountHero />
      <div className="pr-page">
        {/* Header */}
        <div className="pr-header">
          <p className="pr-header-sub">
            Discover the finest products for your beloved companions
          </p>
          <div className="pr-sort-row">
            {[
              { label: "Newest", value: "createdAt" },
              { label: "Price", value: "productPrice" },
              { label: "Popular", value: "productViews" },
            ].map((s) => (
              <button
                key={s.value}
                onClick={() => searchOrderHandler(s.value)}
                className={`pr-sort-pill${productSearch.order === s.value ? " active" : ""}`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Layout */}
        <div className="pr-layout">
          {/* ── SIDEBAR ── */}
          <aside className="pr-sidebar">
            <div className="pr-sidebar-inner">
              {/* Search */}
              <FilterSection title="Search">
                <div className="pr-search-row">
                  <input
                    className="pr-input"
                    placeholder="Find products…"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && searchProductHandler()
                    }
                  />
                  <button className="pr-go-btn" onClick={searchProductHandler}>
                    Go
                  </button>
                </div>
              </FilterSection>

              {/* Pet type */}
              <FilterSection title="Pet Type">
                <div className="pr-pet-list">
                  {Object.values(PetType).map((type) => (
                    <label key={type} className="pr-check-row">
                      <span
                        className={`pr-check-box${selectedPetType === type ? " checked" : ""}`}
                        onClick={() => petTypeHandler(type)}
                      />
                      <span className="pr-check-emoji">{PET_EMOJI[type]}</span>
                      <span
                        className="pr-check-label"
                        onClick={() => petTypeHandler(type)}
                      >
                        {type.replace("_", " ")}
                      </span>
                    </label>
                  ))}
                </div>
              </FilterSection>

              {/* Category */}
              <FilterSection title="Category">
                <div className="pr-cat-list">
                  {Object.values(ProductCollection).map((cat) => (
                    <label key={cat} className="pr-check-row">
                      <span
                        className={`pr-check-box${productSearch.productCollection === cat ? " checked" : ""}`}
                        onClick={() => searchCollectionHandler(cat)}
                      />
                      <span
                        className="pr-check-label"
                        onClick={() => searchCollectionHandler(cat)}
                      >
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              </FilterSection>
            </div>

            {/* CTA button pinned to bottom */}
            <div className="pr-sidebar-footer">
              <button className="pr-show-btn" onClick={clearAllFiltersHandler}>
                Clear all filters
              </button>
            </div>
          </aside>

          {/* ── GRID ── */}
          <div>
            <p className="pr-count">
              Showing <strong>{products.length}</strong> products
            </p>

            {products.length > 0 ? (
              <div className="pr-grid">
                {products.map((product: Product, i: number) => {
                  const isAdded = addedId === product._id;
                  return (
                    <TiltCard
                      key={product._id}
                      delay={i * 60}
                      onClick={() => history.push(`/products/${product._id}`)}
                    >
                      <div className="pr-card">
                        <div className="pr-img-wrap">
                          <img
                            src={`${serverApi}/${product.productImages[0]}`}
                            alt={product.productName}
                            className="pr-img"
                          />
                          <span className="pr-badge">
                            {product.productCollection}
                          </span>
                          <span className="pr-views">
                            👁 {product.productViews ?? 0}
                          </span>
                        </div>
                        <div className="pr-stripe" />
                        <div className="pr-body">
                          <h3 className="pr-name">{product.productName}</h3>
                          <p className="pr-desc">
                            Premium quality for your pet
                          </p>
                          <div className="pr-bottom">
                            <span className="pr-price">
                              ${product.productPrice}
                            </span>
                            <button
                              className={`pr-cart-btn${isAdded ? " added" : ""}`}
                              onClick={(e) => handleAdd(e, product)}
                            >
                              {isAdded ? (
                                <span className="pr-added-check">✓ Added</span>
                              ) : (
                                "+ Cart"
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </TiltCard>
                  );
                })}
              </div>
            ) : (
              <div className="pr-empty">
                <div className="pr-empty-blob">🐾</div>
                <h3 className="pr-empty-title">Nothing here yet</h3>
                <p className="pr-empty-sub">
                  Try adjusting your filters or search terms.
                </p>
                <button
                  className="pr-empty-btn"
                  onClick={clearAllFiltersHandler}
                >
                  Clear all filters
                </button>
              </div>
            )}

            {products.length > 0 && (
              <div className="pr-pagination">
                <Pagination
                  page={productSearch.page}
                  onChange={paginationHandler}
                  count={Math.ceil(products.length / productSearch.limit) || 1}
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
