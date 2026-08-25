import './checkout.css'
import './checkout-header.css'
import axios from 'axios'
import dayjs from 'dayjs'
import { useState, useEffect } from 'react'

export function CheckoutPage({ cart, fetchCartData }) {

    let totalQuantity = 0;

    for (let i of cart) {
        totalQuantity += i.quantity;
    }

    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);

    async function fetchDeliveryOptions() {
        const response = await axios.get("http://localhost:3000/api/delivery-options?expand=estimatedDeliveryTime");
        setDeliveryOptions(response.data);
    }

    async function fetchPaymentSummary() {
        const response = await axios.get("http://localhost:3000/api/payment-summary");
        setPaymentSummary(response.data);
    }

    useEffect(() => {
        fetchDeliveryOptions();
        fetchPaymentSummary();
    }, [cart]);

    async function updateDeliveryOption(id, productId, deliveryOptionId) {
        try {
            const response = await axios.put(`http://localhost:3000/api/cart-items/${productId}`, {
                deliveryOptionId: id
            });
            if (response.status === 200) {
                await fetchCartData();
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function deleteCartItem(productId) {
        const response = await axios.delete(`http://localhost:3000/api/cart-items/${productId}`);
        if (response.status === 204) {
            await fetchCartData();
        }
    }

    return (
        <>
            <title>Checkout Page</title>
            <div className="checkout-header">
                <div className="header-content">
                    <div className="checkout-header-left-section">
                        <a href="/">
                            <img className="logo" src="images/logo.png" />
                            <img className="mobile-logo" src="images/mobile-logo.png" />
                        </a>
                    </div>

                    <div className="checkout-header-middle-section">
                        Checkout (<a className="return-to-home-link"
                            href="/">{`${totalQuantity} items`}</a>)
                    </div>

                    <div className="checkout-header-right-section">
                        <img src="images/icons/checkout-lock-icon.png" />
                    </div>
                </div>
            </div>

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <div className="order-summary">

                        {
                            deliveryOptions.length > 0 && cart.map((item) => {
                                let selectedDate;
                                for (let i of deliveryOptions) {
                                    if (i.id === item.deliveryOptionId) {
                                        selectedDate = dayjs(i.estimatedDeliveryTimeMs).format('dddd, MMMM D');
                                    }
                                }
                                return (
                                    <div key={item.productId} className="cart-item-container">
                                        <div className="delivery-date">
                                            {`Delivery date: ${selectedDate}`}
                                        </div>

                                        <div className="cart-item-details-grid">
                                            <img className="product-image"
                                                src={item.product.image} />

                                            <div className="cart-item-details">
                                                <div className="product-name">
                                                    {item.product.name}
                                                </div>
                                                <div className="product-price">
                                                    ${item.product.priceCents / 100}
                                                </div>
                                                <div className="product-quantity">
                                                    <span>
                                                        Quantity: <span className="quantity-label">{item.quantity}</span>
                                                    </span>
                                                    <span className="update-quantity-link link-primary">
                                                        Update
                                                    </span>
                                                    <span className="delete-quantity-link link-primary" onClick={() => { deleteCartItem(item.productId) }}>
                                                        Delete
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="delivery-options">
                                                <div className="delivery-options-title">
                                                    Choose a delivery option:
                                                </div>

                                                <form>
                                                    {
                                                        deliveryOptions.map((option) => {
                                                            return (
                                                                <div key={option.id} className="delivery-option" onClick={() => { updateDeliveryOption(option.id, item.productId, item.deliveryOptionId) }} >
                                                                    <input type="radio"
                                                                        checked={Number(option.id) === Number(item.deliveryOptionId)}
                                                                        className="delivery-option-input"
                                                                        name={`delivery-option-${option.id}`}
                                                                        onChange={() => { }}
                                                                    />
                                                                    <div>
                                                                        <div className="delivery-option-date">
                                                                            {dayjs(option.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                                                                        </div>
                                                                        <div className="delivery-option-price">
                                                                            {(option.priceCents == 0) ? "FREE Delivery" : `${(option.priceCents / 100)} - Shipping`}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })
                                                    }
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }

                    </div>

                    <div className="payment-summary">
                        <div className="payment-summary-title">
                            Payment Summary
                        </div>

                        {(paymentSummary) && (
                            <>
                                <div className="payment-summary-row">
                                    <div>{`Items (${paymentSummary.totalItems}):`}</div>
                                    <div className="payment-summary-money">{`$ ${paymentSummary.productCostCents / 100}`}</div>
                                </div>

                                <div className="payment-summary-row">
                                    <div>Shipping &amp; handling:</div>
                                    <div className="payment-summary-money">{`$ ${paymentSummary.shippingCostCents / 100}`}</div>
                                </div>

                                <div className="payment-summary-row subtotal-row">
                                    <div>Total before tax:</div>
                                    <div className="payment-summary-money">{`$ ${paymentSummary.totalCostBeforeTaxCents / 100}`}</div>
                                </div>

                                <div className="payment-summary-row">
                                    <div>Estimated tax (10%):</div>
                                    <div className="payment-summary-money">{`$ ${paymentSummary.taxCents / 100}`}</div>
                                </div>

                                <div className="payment-summary-row total-row">
                                    <div>Order total:</div>
                                    <div className="payment-summary-money">{`$ ${paymentSummary.totalCostCents / 100}`}</div>
                                </div>

                                <button className="place-order-button button-primary">
                                    Place your order
                                </button>
                            </>
                        )
                        }
                    </div>
                </div>
            </div>
        </>
    );
}