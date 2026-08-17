import React from "react";
import nike1 from "@/assets/images/Nike1.webp";
import nike2 from "@/assets/images/Nike2.webp";
import nike3 from "@/assets/images/Nike3.webp";
import nike4 from "@/assets/images/Nike4.webp";
import nike5 from "@/assets/images/Nike5.webp";
import nike6 from "@/assets/images/Nike6.webp";
import nike7 from "@/assets/images/Nike7.webp";
import nike8 from "@/assets/images/Nike8.webp";

export default function Products() {
  /*
This page will serve as all of the customer will pick in which category like men, women, and children
*/

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
    <div>
      <div>{/* Breadcrumbs as Products/Page title */}</div>

      {/* Main Body */}
      <div>
        {/* Search, Sort and Filter */}
        <div>
          <input type="text" placeholder="Search.." />
        </div>

        {/* Products */}
        <div></div>
      </div>
    </div>
  );
}
