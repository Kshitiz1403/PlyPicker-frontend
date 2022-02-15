import React, { useEffect, useState } from "react";
import "./ProductPage.css";
import product_card from "./productdata";
import ReactPaginate from "react-paginate";
import Slider from "@mui/material/Slider";
import { PORT } from "../App";
import axios from "axios";

function ProductPage() {

  useEffect(() => {
    getData()
  }, [])


  const getData = async () => {
    const productData = await (await axios.get(`${PORT}/products`)).data
    console.log(productData)
    setItems(productData)
  }

  // Slider Filter
  const [value, setValue] = useState([10000, 20000]);
  const changeValue = (event, value) => {
    setValue(value);
  };

  const getText = (value) => `${value}`;

  // //////////////////////////////////
  const [items, setItems] = useState(product_card.slice(0, 50));

  // PAGINATION
  const [pageNumber, setPageNumber] = useState(0);

  // itemsperpage
  const usersPerPage = 6;

  // itemsvisited
  const pagesVisited = pageNumber * usersPerPage;

  // Deciding number of pages
  const pageCount = Math.ceil(items.length / usersPerPage);

  // Changing page function
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  // Maximum description length
  const MAX_DESCR_LENGTH = 100;

  // passing product data via props
  const listItems = items
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((item) => (
      <div className="productpage_card" key={item._id}>
        <div className="productpage_card_img">
          <img src={item.Product_Image} alt={item.Product_Name} />
        </div>
        <div className="productpage_product_info">
          <h2 className="productpage_product_heading">{item.Product_Name}</h2>
          <h3 className="productpage_product_code">{item.product_code}</h3>
          <p className="productpage_product_description">{`${item.Product_Description}`.length> MAX_DESCR_LENGTH? `${item.Product_Description}`.substring(0,MAX_DESCR_LENGTH)+'...': `${item.Product_Description}`}</p>
          <p className="productpage_product_price">
            <span>{item.product_currency}</span>
            {item.Product_Price}
          </p>
        </div>
      </div>
    ));

  return (
    <>
      <div className="container">
        <div className="productpage_main_container">
          <div className="productpage_leftside">
            <div className="productpage_leftside_heading">FILTERS</div>
            <div className="productpage_filters">
              {/* Checkbox Filter */}
              <div class="navbar navbar-expand-lg navbar-light">
                <div class="container-fluid">
                  <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span class="navbar-toggler-icon"></span>
                  </button>
                  <div class="collapse navbar-collapse " id="navbarNav">
                    <ul class="nav flex-column">
                      <li class="nav-item">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label
                            class="form-check-label"
                            for="flexCheckDefault"
                          >
                            Default checkbox
                          </label>
                        </div>
                      </li>
                      <li class="nav-item">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label
                            class="form-check-label"
                            for="flexCheckDefault"
                          >
                            Default checkbox
                          </label>
                        </div>
                      </li>
                      <li class="nav-item">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label
                            class="form-check-label"
                            for="flexCheckDefault"
                          >
                            Default checkbox
                          </label>
                        </div>
                      </li>
                      <li className="nav-item">
                        {/* Slider Filter */}

                        <Slider
                          style={{ marginTop: 20, width: 150 }}
                          value={value}
                          onChange={changeValue}
                          min={500}
                          max={30000}
                          defaultValue={1000}
                          getAriaValueText={getText}
                          valueLabelDisplay="auto"
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="productpage_rightside">
            {listItems}
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductPage;
