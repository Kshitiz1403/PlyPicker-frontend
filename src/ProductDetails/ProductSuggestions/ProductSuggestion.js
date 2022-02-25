import React, { Component } from "react";
import Slider from "react-slick";
import "./ProductSuggestion.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ProductSuggestion() {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const Item = () => (
    <div
      className="suggestion_product_main"
      // className="product_suggestion_product_container"
      // style={{ backgroundColor: "red" }}
    >
      <div
        // className="production_suggestion_pimage"
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <img
          src="https://www.cera-india.com/wp-content/uploads/2020/09/F9025102.jpeg"
          alt=""
          style={{
            objectFit: "contain",
            width: "100%",
          }}
        />
      </div>
      <div className="product_suggestion_pname">NAME</div>
      <div className="product_suggestion_pamount">PRICE</div>
    </div>
  );
  return (
    <div className="container">
      <div className="product_suggestion_container">
        <div className="product_suggestion_heading">You might also like</div>
        <div>
          <h2> Responsive </h2>
          <Slider {...settings}>
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default ProductSuggestion;
