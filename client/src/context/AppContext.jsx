import React, { createContext, useState, useEffect, useMemo } from 'react';
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
    const [cartItems, setCartItems] = useState({})
    const [selectedColor, setSelectedColor] = useState();

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

    const addToCart = async (productId) => {
        if (!cartItems[productId]) {
            setCartItems((prev) => ({ ...prev, [productId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [productId]: prev[productId] + 1 }))
        }
    }

    const removeToCart = async (productId) => {
        setCartItems((prev) => ({ ...prev, [productId]: prev[productId] - 1 }))
    }

    const getCartTotal = () => {
        return Object.values(cartItems).reduce((sum, qty) => sum + (qty || 0), 0);
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
        addToCart, removeToCart, getCartTotal,
        selectedColor, setSelectedColor
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

