import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Products from './components/products';
import CartPage from './components/CartPage';
import Header from './components/Header';

function App() {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        const existingItem = cartItems.find((item) => item.id === product.id);
        if (existingItem) {
            // If item already in cart, update its quantity
            updateQuantity(product.id, existingItem.quantity + 1);
        } else {
            // Otherwise, add new item to cart
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
    };

    const removeFromCart = (itemId) => {
        setCartItems(cartItems.filter((item) => item.id !== itemId));
    };

    const updateQuantity = (itemId, quantity) => {
        const newQuantity = parseInt(quantity, 10);
        if (newQuantity > 0) {
            setCartItems(
                cartItems.map((item) =>
                    item.id === itemId ? { ...item, quantity: newQuantity } : item
                )
            );
        }
    };

    return (
        <Router>
            <div>
                <Header cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} />
                <Routes>
                    <Route path="/" element={<Products addToCart={addToCart} />} />
                    <Route 
                        path="/cart" 
                        element={
                            <CartPage
                                cartItems={cartItems}
                                removeFromCart={removeFromCart}
                                updateQuantity={updateQuantity}
                            />
                        } 
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
