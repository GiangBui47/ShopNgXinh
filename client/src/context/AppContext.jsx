import React, { createContext, useState, useEffect, useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { product_categories, product_images, products, product_inventory } from '../assets/asset';

export const AppContext = createContext({
    activeMenuKey: null,
    setActiveMenuKey: () => { },
    isHomePage: false,
});

export const AppContextProvider = ({ children }) => {
    const location = useLocation();
    const [activeMenuKey, setActiveMenuKey] = useState(null);
    const [isHomePage, setIsHomePage] = useState(location.pathname === '/');
    const [rawProducts, setRawProducts] = useState(products);
    const [categories, setCategories] = useState(product_categories);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [productImages, setProductImages] = useState(product_images);
    const [productInventory, setProductInventory] = useState(product_inventory);

    const cartTimeoutRef = useRef(null);

    const loadCartFromStorage = () => {
        const savedData = localStorage.getItem('cartData');
        if (savedData) {
            try {
                const { cart, lastUpdated } = JSON.parse(savedData);
                const now = Date.now();
                const tenMinutes = 10 * 60 * 1000;
                if (now - lastUpdated > tenMinutes) {
                    localStorage.removeItem('cartData');
                    return [];
                }
                return cart;
            } catch (error) {
                console.error('Error parsing cart from storage:', error);
                localStorage.removeItem('cartData');
                return [];
            }
        }
        return [];
    };

    const [cartItems, setCartItems] = useState(loadCartFromStorage);
    const [selectedColor, setSelectedColor] = useState();

    const saveCartAndSetTimeout = (newCart) => {
        const cartData = {
            cart: newCart,
            lastUpdated: Date.now()
        };
        localStorage.setItem('cartData', JSON.stringify(cartData));

        if (cartTimeoutRef.current) {
            clearTimeout(cartTimeoutRef.current);
        }

        cartTimeoutRef.current = setTimeout(() => {
            setCartItems([]);
            localStorage.removeItem('cartData');
            console.log('Cart expired and cleared after 5 minutes');
        }, 10 * 60 * 1000);
    };

    useEffect(() => {
        if (cartItems.length > 0) {
            saveCartAndSetTimeout(cartItems);
        } else {
            localStorage.setItem('cartData', JSON.stringify({ cart: [], lastUpdated: Date.now() }));
            if (cartTimeoutRef.current) {
                clearTimeout(cartTimeoutRef.current);
                cartTimeoutRef.current = null;
            }
        }
    }, [cartItems]);

    useEffect(() => {
        return () => {
            if (cartTimeoutRef.current) {
                clearTimeout(cartTimeoutRef.current);
            }
        };
    }, []);

    const enrichedProducts = useMemo(() => {
        return rawProducts.map(product => {
            const primaryImage = productImages.find(
                img => img.product_id === product.product_id
            );
            const imageUrl = primaryImage?.image_url

            const inventoryForProduct = productInventory.filter(
                inv => inv.product_id === product.product_id
            );
            const colors = [...new Set(inventoryForProduct.map(inv => inv.color))];
            const sizes = [...new Set(inventoryForProduct.map(inv => inv.size))];

            return {
                ...product,
                image: imageUrl,
                alt_text: primaryImage?.alt_text || product.product_name,
                color: colors,
                size: sizes
            };
        });
    }, [rawProducts, productImages, productInventory]);

    const addToCart = (item) => {
        const { product_id, color, size } = item;
        const existingItemIndex = cartItems.findIndex(
            cartItem => cartItem.product_id === product_id &&
                cartItem.color === color &&
                cartItem.size === size
        );

        let updatedCart;
        if (existingItemIndex >= 0) {
            updatedCart = [...cartItems];
            updatedCart[existingItemIndex].quantity += 1;
        } else {
            updatedCart = [...cartItems, { ...item, quantity: 1 }];
        }
        setCartItems(updatedCart);
    };

    const removeToCart = (product_id, color, size) => {
        const existingItemIndex = cartItems.findIndex(
            cartItem => cartItem.product_id === product_id &&
                cartItem.color === color &&
                cartItem.size === size
        );

        if (existingItemIndex >= 0) {
            const updatedCart = [...cartItems];
            updatedCart[existingItemIndex].quantity -= 1;
            if (updatedCart[existingItemIndex].quantity <= 0) {
                updatedCart.splice(existingItemIndex, 1);
            }
            setCartItems(updatedCart);
        }
    };

    const getCartTotal = () => {
        return cartItems.reduce((sum, item) => sum + item.quantity, 0);
    };

    useEffect(() => {
        setIsHomePage(location.pathname === '/');
        setActiveMenuKey(null);
    }, [location.pathname]);

    const contextValue = {
        activeMenuKey,
        setActiveMenuKey,
        isHomePage,
        products: enrichedProducts,
        setProducts: setRawProducts,
        categories,
        selectedCategory, setSelectedCategory,
        productImages,
        productInventory,
        cartItems, addToCart, removeToCart, getCartTotal,
        selectedColor, setSelectedColor
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};