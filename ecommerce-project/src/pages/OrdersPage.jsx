import './orders.css';
import { Header } from '../components/Header.jsx';
import { useEffect, useState, Fragment } from 'react';
import dayjs from 'dayjs';
import api from '../api';

export function OrdersPage({ cart, fetchCartData }) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function fetchOrders() {
            const response = await api.get('/orders?expand=products');
            setOrders(response.data);
        }

        fetchOrders();
    }, []);

    return (
        <>
            <Header cart={cart} />

            <div className="orders-page">
                <div className="page-title">Your Orders</div>

                <div className="orders-grid">
                    {
                        orders.map((order) => {
                            return (
                                <div key={order.id} className="order-container">
                                    <div className="order-header">
                                        <div className="order-header-left-section">
                                            <div className="order-date">
                                                <div className="order-header-label">Order Placed:</div>
                                                <div>{dayjs(order.orderTimeMs).format('MMMM DD')}</div>
                                            </div>
                                            <div className="order-total">
                                                <div className="order-header-label">Total:</div>
                                                <div>{`$${order.totalCostCents / 100}`}</div>
                                            </div>
                                        </div>

                                        <div className="order-header-right-section">
                                            <div className="order-header-label">Order ID:</div>
                                            <div>{order.id}</div>
                                        </div>
                                    </div>

                                    <div className="order-details-grid">
                                        {
                                            order.products.map((product) => {
                                                return (
                                                    <Fragment key={product.product.id}>
                                                        < div className="product-image-container">
                                                            <img src={product.product.image} />
                                                        </div>

                                                        <div className="product-details">
                                                            <div className="product-name">
                                                                {product.product.name}
                                                            </div>
                                                            <div className="product-delivery-date">{`Arriving on: ${dayjs(product.estimatedDeliveryTimeMs).format('MMMM DD')}`}</div>
                                                            <div className="product-quantity">{`Quantity: ${product.quantity}`}</div>
                                                            <button className="buy-again-button button-primary" onClick={() => {
                                                                api.post('/cart-items', {
                                                                    productId: product.id,
                                                                    quantity: 1
                                                                });
                                                                fetchCartData();
                                                            }}>
                                                                <img className="buy-again-icon" src="images/icons/buy-again.png" />
                                                                <span className="buy-again-message">Add to Cart</span>
                                                            </button>
                                                        </div>

                                                        <div className="product-actions">
                                                            <a href="/tracking">
                                                                <button className="track-package-button button-secondary">
                                                                    Track package
                                                                </button>
                                                            </a>
                                                        </div>
                                                    </Fragment>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </>
    );
}