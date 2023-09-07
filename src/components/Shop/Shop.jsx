import React, { useEffect, useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';

const Shop = () => {

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect( () => {
        fetch('products.json')
        .then(res => res.json())
        .then(data => setProducts(data))
    }, []);

    useEffect(() => {
        const storedCart = getShoppingCart();
        const saveCart = [];
        // Step 1: Get id
        for(const id in storedCart){
            // Step 2: Get the product by using id
            const addedProduct = products.find(product => product.id === id);
            if(addedProduct){
                // Step 3: Get quantity of the product
                const quantity = storedCart[id];
                addedProduct.quantity = quantity
                // Step 4: Add the add product to the saved cart
                saveCart.push(addedProduct);
            }
            console.log(addedProduct) 
        }
        // Step 5: Set the cart
        setCart(saveCart);
    },[products])

    const handleAddProduct = (product) => {
        const newCart = [...cart, product];
        setCart(newCart)
        addToDb(product.id)
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                    key={product.id}
                    product={product}
                    handleAddProduct={handleAddProduct}
                    ></Product>)
                }
            </div>

            <div className="cart-container">
                <Cart
                    cart={cart}
                ></Cart>
            </div>
        </div>
    );
};

export default Shop;