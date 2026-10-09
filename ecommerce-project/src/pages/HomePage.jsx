import { useEffect, useState } from 'react';
import './HomePage.css'
import { Header } from '../components/Header.jsx';
import { Product } from '../components/Product.jsx'
import api from '../api';

export function HomePage({ cartItems, fetchCartData }) {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            const response = await api.get('/products');
            setProducts(response.data);
        }

        fetchProducts();
    }, []);

    return (
        <>
            <title>Ecommerce project</title>

            <Header cart={cartItems} />

            <div className="home-page">
                <div className="products-grid">
                    {products.map((product) => {
                        return (
                            <Product key={product.id} product={product} fetchCartData={fetchCartData} />
                        );
                    })}
                </div>
            </div>
        </>
    );
}