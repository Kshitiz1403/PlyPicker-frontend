import React from "react";
import StarRating from "../StarRating/StarRating";
import "./ProductDetails.css";

class ProductDetails extends React.Component {
  state = {
    products: [
      {
        id: 1,
        product_name: "demo chair 1",
        description:
          "demo description just a random description about the product Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        price: 22000,
        product_image: [
          "https://ii1.pepperfry.com/media/catalog/product/a/n/494x544/anne-solid-wood-armchair-in-warm-chestnut-finish---amberville-by-pepperfry-anne-solid-wood-armchair--xhy5ss.jpg",
          "https://ii1.pepperfry.com/media/catalog/product/a/n/800x880/anne-solid-wood-armchair-in-warm-chestnut-finish-by-amberville-anne-solid-wood-armchair-in-warm-ches-fd89cu.jpg",
          "https://ii1.pepperfry.com/media/catalog/product/a/n/800x880/anne-solid-wood-armchair-in-provincial-teak-finish-by-amberville-anne-solid-wood-armchair-in-provinc-yrejlm.jpg",
        ],
        product_code: "AUB123 - XYZ",
        product_currency: "₹",
        colors: [
          "https://ii1.pepperfry.com/media/catalog/product/a/n/494x544/anne-solid-wood-armchair-in-warm-chestnut-finish---amberville-by-pepperfry-anne-solid-wood-armchair--xhy5ss.jpg",
          "https://ii1.pepperfry.com/media/catalog/product/a/n/800x880/anne-solid-wood-armchair-in-provincial-teak-finish---amberville-by-pepperfry-anne-solid-wood-armchai-2pszoe.jpg",
        ],
      },
    ],
    index: 0,
  };

  myRef = React.createRef();

  handlePoses = (index) => {
    this.setState({ index: index });

    const images = this.myRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
  };

  handleColor = (colorindex) => {
    this.setState({ colorindex: colorindex });
  };

  render() {
    const { products, index } = this.state;
    console.log(products);
    return (
      <>
        <div className="container">
          {products.map((item) => (
            <>
              <div className="productdetails_maincontainer" key={item.id}>
                <div className="productdetails_leftside">
                  <div className="mainproduct_image">
                    <img
                      src={item.product_image[index]}
                      alt={item.product_name}
                    />
                  </div>

                  <div
                    className="productdetail_product_photos"
                    ref={this.myRef}
                  >
                    {item.product_image.map((img, index) => (
                      <img
                        src={img}
                        alt=""
                        key={index}
                        onClick={() => this.handlePoses(index)}
                      />
                    ))}
                  </div>
                </div>
                <div className="productdetails_rightside">
                  <div className="productdetail_heading">
                    <h2>{item.product_name}</h2>
                  </div>
                  <div className="productdetail_rating">
                    <StarRating />
                  </div>
                  <div className="productdetail_description">
                    {item.description}
                  </div>
                  <div className="productdetail_price">
                    <span>{item.product_currency}</span> {item.price}
                  </div>
                  <div className="productdetail_color">
                    {item.colors.map((color, colorindex) => (
                      <div className="productdetail_color_color">
                        <img
                          src={color}
                          alt=""
                          key={colorindex}
                          onClick={() => this.handleColor(colorindex)}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="productdetail_code">{item.product_code}</div>
                  <div className="productdetail_button_container">
                    <div className="productdetail_button_1">Add to Cart</div>
                    <div className="productdetail_button_2">Buy Now</div>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </>
    );
  }
}

export default ProductDetails;
