import React, { useState } from "react";
import "./CartPage.css";
import {
  FaGreaterThan,
  FaMapMarkerAlt,
  FaRegCalendarAlt,
  FaRegHeart,
  FaTrashAlt,
} from "react-icons/fa";

import { RiCoupon2Line } from "react-icons/ri";

function CartPage() {
  const [count, setCount] = useState(1);

  return (
    <div className="container cartpagemain">
      <div className="cartpage_heading">
        In Your Cart <span>(1 Item)</span>
      </div>
      <div className="cartpage_maincontainer">
        <div className="cartpage_product_side">
          <div className="cartpage_product_side_pincode">
            <div className="pincode_location_icon">
              <FaMapMarkerAlt />
              <div className="pincode_text">
                Enter Your Pincode For Delivery & Assembly Information
              </div>
            </div>

            <div className="pincode_pincode_button">
              <input
                type="text"
                class="order_summary_pincode"
                placeholder="Pincode"
                maxlength="6"
              />
              <input
                type="button"
                class="order_summary_pincode_btn"
                value="GO"
              />
            </div>
          </div>
          <div className="product_side_product">
            <div className="product_product_image_info">
              <div className="product_image_image">
                <img
                  src="https://ii1.pepperfry.com/media/catalog/product/s/e/90x99/segur-solid-wood-open-tv-shelf-in-provincial-teak-finish-by-woodsworth-segur-solid-wood-open-tv-shel-vllv6v.jpg"
                  alt=""
                />
              </div>
              <div className="product_product_info">
                <div className="product_product_info_heading">
                  <a href="#">
                    Segur Solid Wood Open TV Shelf In Provincial Teak Finish By
                    Woodsworth
                  </a>
                </div>
                <div className="product_product_info_warranty">
                  <p>36 Months' Warranty, 100% Genuine</p>
                </div>
                <div className="product_product_info_delivery">
                  <div className="delivery_info_calender">
                    <FaRegCalendarAlt />
                  </div>
                  <div className="delivery_info_text">
                    Delivery by <br />
                    <span>Enter your Pincode above to get these details</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="product_product_quantity">
              <div className="quantity_counter">
                <div
                  className="product_counter_remove"
                  type="button"
                  onClick={() => setCount(count - 1)}
                >
                  -
                </div>
                <div className="product_counter_count">{count}</div>
                <div
                  className="product_counter_add"
                  type="button"
                  onClick={() => setCount(count + 1)}
                >
                  +
                </div>
              </div>
              <div className="product_remove_wishlist">
                <FaTrashAlt className="product_remove_icon" />
                <FaRegHeart className="product_wishlist_icon" />
              </div>
            </div>
          </div>
        </div>
        <div className="cartpage_pricing_side">
          <div className="coupon_container">
            <div className="coupon_icon">
              <RiCoupon2Line />
              <span>Apply Coupon</span>
            </div>
            <div className="coupon_rightarrow">
              <FaGreaterThan />
            </div>
          </div>
          <div className="pricing_side_price_container">
            <div className="cart_value">
              <div className="cart_value_text">Cart Value</div>
              <div className="cart_value_value">Rs.121212</div>
            </div>
            <div className="retail_discount">
              <div className="retail_discount_text">Retail Discount</div>
              <div className="retail_discount_value">(-) Rs.121212</div>
            </div>
            <div className="price_extra_info">
              Delivery & Assembly Charges Extra. Enter Pincode to Know
            </div>
            <div className="price_total_amount">
              <div className="total_amount_text">Total</div>
              <div className="total_amount_amount">
                <div className="total_amount_amount_price">Rs.xyz </div>
                <div className="total_amount_amount_text">
                  (Inclusive of all taxes)
                </div>
              </div>
            </div>
          </div>
          <div className="pricing_side_placeorder_button" type="button">
            Place Order
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
