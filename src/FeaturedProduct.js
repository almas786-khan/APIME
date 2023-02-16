import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import ProductDetails from "./ProductDetails";
import axios from "axios";

function FeaturedProduct(props) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    function fetchProducts() {
        axios
            .get("/apime/movies")
            .then((res) => {
                console.log(res);
                setProducts(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    return (
        <div>
            <h1> Your Products List is shown below:</h1>
            <div className="item-container">
                {products.map((product) => (
                    <div className="card" key={product._id}>
                        <h3>{product.title}</h3>
                        <p>
                            {product.yearReleased}
                        </p>
                        <Link to={`/product/${product._id}`}>More Details</Link>
                    </div>
                ))}
            </div>
            <Routes>
                <Route
                    path="/product/:id"
                    render={({ match }) => (
                        <ProductDetails
                            product={products.find(
                                (product) => String(product._id) === match.params._id
                            )}
                        />
                    )}
                />
            </Routes>
        </div>
    );
}
export default FeaturedProduct;