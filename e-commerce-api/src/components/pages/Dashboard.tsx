import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import bgImg from "@/assets/images/bgimg.jpg";
import nike1 from "@/assets/images/Nike1.webp";
import nike2 from "@/assets/images/Nike2.webp";
import nike3 from "@/assets/images/Nike3.webp";
import nike4 from "@/assets/images/Nike4.webp";
import nike5 from "@/assets/images/Nike5.webp";
import nike6 from "@/assets/images/Nike6.webp";
import nike7 from "@/assets/images/Nike7.webp";
import nike8 from "@/assets/images/Nike8.webp";
/*
UI Sizes

text-xs	0.75rem	12px - Caption
text-sm	0.875rem	14px - Nav Item
text-base	1rem	16px - Body
text-lg	1.125rem	18px - Stat Label
text-xl	1.25rem	20px - Stat Value
text-2xl	1.5rem	24px - Section Heading
text-3xl	1.875rem	30px - Page Title
*/

/*
Color Palette
wwhite - #EEEEEE
orange - #DC5F00
red - #CF0A0A
black - #000000
https://colorhunt.co/palette/000000cf0a0adc5f00eeeeee
*/

// Reusable layout components to capsule the CSS design classes
function PageTitle({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-3xl font-bold text-[#000000] tracking-tight mb-1">
      {children}
    </h1>
  );
}

function PageSubtitle({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-[#CF0A0A]">{children}</p>;
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
  const baseStyles =
    "px-5 py-2 rounded-lg font-medium text-sm transition-all duration-200 ease-out active:scale-95 cursor-pointer flex items-center gap-2 justify-center hover:-translate-y-0.5 hover:shadow-md hover:shadow-slate-200/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none";

  const variants = {
    primary:
      "bg-[#000000] text-[#EEEEEE] border border-black hover:bg-[#222222] active:bg-[#000000]",
    secondary:
      "bg-[#DC5F00] text-white border border-[#DC5F00] hover:bg-[#c45400] hover:border-[#c45400] active:bg-[#DC5F00]",
    outline:
      "bg-transparent text-[#000000] border border-slate-300 hover:bg-slate-50 hover:border-slate-400 active:bg-transparent",
    text: "bg-transparent text-[#000000] p-0 hover:text-[#DC5F00] hover:-translate-y-0 hover:shadow-none active:scale-100 shadow-none",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

// Define interface for a single product (renamed to Product for readability)
interface Product {
  id: number; // Database IDs in your prisma schema are Int numbers
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string; // Database matches 'imageUrl' instead of 'image'
  categoryId: number;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/products")
      .then((res) => res.json()) // 1. Convert the raw response stream to JSON
      .then((resData) => {
        // 2. Set the state with the products array
        // Recall that your backend wraps the response in `{ data: products }`
        setProducts(resData.data);
      })
      .catch((error) => {
        console.error("Failed to load products", error);
      });
  }, []); // [] ensures the fetch runs exactly once on load

  const trendingProducts = [
    {
      name: "Nike Air Max Pulse",
      price: "$160.00",
      image: nike1,
      rating: "4.8",
      category: "Running Shoes",
    },
    {
      name: "Nike Dunk Low Retro",
      price: "$115.00",
      image: nike2,
      rating: "4.9",
      category: "Lifestyle Shoes",
    },
    {
      name: "Nike Air Force 1 '07",
      price: "$115.00",
      image: nike3,
      rating: "4.7",
      category: "Lifestyle Shoes",
    },
    {
      name: "Nike Pegasus 41",
      price: "$140.00",
      image: nike4,
      rating: "4.6",
      category: "Road Running Shoes",
    },
  ];

  const categoryProducts = [
    {
      name: "Nike Air Max Dn",
      image: nike5,
      category: "Lifestyle",
    },
    {
      name: "Nike Invincible 3",
      image: nike6,
      category: "Running",
    },
    {
      name: "Nike GT Hustle 3",
      image: nike7,
      category: "Basketball",
    },
    {
      name: "Nike Metcon 9",
      image: nike8,
      category: "Training",
    },
  ];

  return (
    <div className="flex flex-col gap-8 w-full h-auto">
      {/* Welcome & Header Section */}
      <div>
        <PageTitle>Elevate Your Style</PageTitle>
        <PageSubtitle>
          Welcome back, Eric. Here is what is happening with your store today.
        </PageSubtitle>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm h-[15rem] w-full">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bgImg})` }}
        />
      </div>

      <div className="flex items-center justify-between border-b border-slate-200 pb-3 mt-4">
        <p className="text-xl font-bold text-[#000000] tracking-tight">
          Shop By Category
        </p>
        <Button variant="text" className="font-bold text-sm group">
          View All Categories
          <FontAwesomeIcon
            icon={faArrowRightLong}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </Button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group cursor-pointer"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EEEEEE] flex items-center justify-center p-6">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="max-h-full max-w-full object-contain transition-transform duration-500 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Category Info */}
            <div className="p-5 flex flex-col flex-grow">
              <span className="text-xs font-bold text-[#DC5F00] uppercase tracking-wider">
                Category
              </span>
              <h3 className="text-lg font-extrabold text-[#000000] mt-0.5">
                {product.category.name}
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-medium line-clamp-1">
                Featured: {product.name}
              </p>
              <p className="text-xs text-slate-500 mt-1 font-medium line-clamp-1">
                Featured: {product.price}
              </p>

              {/* Action Link */}
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mt-4 pt-3 border-t border-slate-100 group-hover:text-[#DC5F00] transition-colors duration-200">
                Explore Category
                <FontAwesomeIcon
                  icon={faArrowRightLong}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-b border-slate-200 pb-3 mt-4">
        <p className="text-xl font-bold text-[#000000] tracking-tight">
          Trending Shoes
        </p>
        <Button variant="text" className="font-bold text-sm group">
          View All Trending Shoes
          <FontAwesomeIcon
            icon={faArrowRightLong}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </Button>
      </div>

      {/* Trending Shoes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {trendingProducts.map((product, i) => (
          <div
            key={i}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
          >
            {/* Image Container */}
            <div className="relative aspect-square w-full overflow-hidden bg-[#EEEEEE] flex items-center justify-center p-4">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-full max-w-full object-contain transition-transform duration-500 ease-out group-hover:scale-110"
              />
              <span className="absolute top-3 left-3 bg-[#DC5F00] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Trending
              </span>
            </div>

            {/* Product Details */}
            <div className="p-4 flex flex-col flex-grow">
              <span className="text-[10px] font-bold text-[#DC5F00] uppercase tracking-wider">
                {product.category}
              </span>
              <h3 className="text-sm font-bold text-[#000000] mt-1 line-clamp-1">
                {product.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-1 mt-1">
                <span className="text-[#DC5F00] text-xs">★</span>
                <span className="text-xs font-semibold text-slate-700">
                  {product.rating}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  (48 reviews)
                </span>
              </div>

              {/* Price & Action */}
              <div className="flex items-center justify-between mt-4 pt-2 border-t border-slate-100">
                <span className="text-base font-extrabold text-[#000000]">
                  {product.price}
                </span>
                <Button
                  variant="primary"
                  className="px-3 py-1.5 text-[11px] font-bold rounded-lg shadow-sm"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
