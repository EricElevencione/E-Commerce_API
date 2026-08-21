import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faHome,
  faChevronRight,
  faSearch,
  faTimes,
  faBoxOpen,
} from "@fortawesome/free-solid-svg-icons";

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  categoryId: number;
  category: Category;
  createdAt: string;
  updatedAt: string;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "text";
}

function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "px-5 py-2 rounded-lg font-medium text-sm transition-all duration-200 ease-out active:scale-95 cursor-pointer flex items-center gap-2 justify-center hover:-translate-y-0.5 hover:shadow-md hover:shadow-slate-200/50 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary:
      "bg-[#000000] text-[#EEEEEE] border border-black hover:bg-[#222222]",
    secondary:
      "bg-[#DC5F00] text-white border border-[#DC5F00] hover:bg-[#c45400]",
    outline:
      "bg-transparent text-[#000000] border border-slate-300 hover:bg-slate-50",
    text: "bg-transparent text-[#000000] p-0 hover:text-[#DC5F00] hover:-translate-y-0 hover:shadow-none active:scale-100",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categorySlug = searchParams.get("category") ?? "";

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const activeCategory =
    categories.find((c) => c.slug === categorySlug) ?? null;

  useEffect(() => {
    fetch("http://localhost:3001/api/categories")
      .then((res) => res.json())
      .then((resData) => setCategories(resData.data ?? []))
      .catch((err) => console.error("Failed to load categories", err));
  }, []);

  useEffect(() => {
    setLoading(true);
    const url = categorySlug
      ? `http://localhost:3001/api/products?category=${categorySlug}`
      : "http://localhost:3001/api/products";
    fetch(url)
      .then((res) => res.json())
      .then((resData) => {
        setProducts(resData.data ?? []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load products", err);
        setLoading(false);
      });
  }, [categorySlug]);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  function handleCategoryClick(slug: string) {
    setSearch("");
    if (slug === "") {
      setSearchParams({});
    } else {
      setSearchParams({ category: slug });
    }
  }

  return (
    <div className="flex flex-col gap-6 w-full h-auto">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2">
        <Link
          to="/dashboard"
          className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#DC5F00] transition-colors duration-200 mr-1"
        >
          <FontAwesomeIcon icon={faArrowLeftLong} />
          <span>Back</span>
        </Link>
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Link
            to="/dashboard"
            className="font-semibold text-slate-700 hover:text-[#DC5F00] transition-colors duration-200 underline underline-offset-2"
          >
            <FontAwesomeIcon icon={faHome} className="mr-1" />
            Home
          </Link>
          {activeCategory && (
            <>
              <FontAwesomeIcon icon={faChevronRight} className="text-[10px]" />
              <span className="font-semibold text-slate-500">
                {activeCategory.name}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold text-[#000000] tracking-tight mb-1">
          {activeCategory ? activeCategory.name : "All Products"}
        </h1>
        <p className="text-sm text-[#CF0A0A]">
          {loading
            ? "Loading products..."
            : `${filteredProducts.length} product${filteredProducts.length !== 1 ? "s" : ""} found`}
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => handleCategoryClick("")}
          className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all duration-200 cursor-pointer ${
            categorySlug === ""
              ? "bg-[#000000] text-white border-black"
              : "bg-white text-slate-600 border-slate-300 hover:border-slate-400"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryClick(cat.slug)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all duration-200 cursor-pointer ${
              categorySlug === cat.slug
                ? "bg-[#DC5F00] text-white border-[#DC5F00]"
                : "bg-white text-slate-600 border-slate-300 hover:border-slate-400"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="relative w-full max-w-sm">
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"
        />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-9 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DC5F00]/30 focus:border-[#DC5F00] transition-all duration-200 text-black"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-5 h-5 text-slate-400 hover:text-slate-600 cursor-pointer focus:outline-none"
          >
            <FontAwesomeIcon icon={faTimes} className="text-xs" />
          </button>
        )}
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden animate-pulse"
            >
              <div className="aspect-square bg-slate-100" />
              <div className="p-4 space-y-2">
                <div className="h-3 bg-slate-100 rounded w-1/3" />
                <div className="h-4 bg-slate-100 rounded w-3/4" />
                <div className="h-3 bg-slate-100 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
          <FontAwesomeIcon
            icon={faBoxOpen}
            className="text-5xl text-slate-200"
          />
          <p className="text-lg font-bold text-slate-400">No products found</p>
          <p className="text-sm text-slate-400">
            Try adjusting your search or category filter.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearch("");
              handleCategoryClick("");
            }}
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group cursor-pointer"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-[#EEEEEE] flex items-center justify-center p-6">
                <img
                  src={product.imageUrl || ""}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain transition-transform duration-500 ease-out group-hover:scale-110"
                />
                {product.stock <= 5 && product.stock > 0 && (
                  <span className="absolute top-3 left-3 bg-[#DC5F00] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Low Stock
                  </span>
                )}
                {product.stock === 0 && (
                  <span className="absolute top-3 left-3 bg-[#CF0A0A] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Out of Stock
                  </span>
                )}
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <span className="text-xs font-bold text-[#DC5F00] uppercase tracking-wider">
                  {product.category.name}
                </span>
                <h3 className="text-sm font-bold text-[#000000] mt-0.5 line-clamp-2 flex-grow">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                  <span className="text-base font-extrabold text-[#000000]">
                    ₱{Number(product.price).toFixed(2)}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {product.stock} in stock
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
