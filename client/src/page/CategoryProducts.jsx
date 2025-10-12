import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import CardProduct from '../Components/CardProduct';
import { toUrlSlug } from '../utils';

const CategoryProducts = () => {
    const { path } = useParams();
    const { categories, products, selectedCategory } = useContext(AppContext);

    const [currentCategory, setCurrentCategory] = useState(null);
    const [displayProducts, setDisplayProducts] = useState([]);

    useEffect(() => {
        let categoryToSet = null;
        let productsToSet = [];

        if (selectedCategory && categories) {
            categoryToSet = categories.find(c => c.category_id === selectedCategory);
        }
        if (!categoryToSet && path && categories) {
            const foundCategory = categories.find(c => toUrlSlug(c.category_name) === path);

            if (foundCategory) {
                categoryToSet = foundCategory;
            }
        }
        if (!categoryToSet) {
            productsToSet = products;
        } else {
            productsToSet = products.filter(p => p.category_id === categoryToSet.category_id);
        }
        setCurrentCategory(categoryToSet);
        setDisplayProducts(productsToSet);

    }, [path, categories, products, selectedCategory]);

    const displayName = currentCategory?.category_name || 'All Products';

    return (
        <div className="min-h-screen ">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center py-8">
                    <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-2">
                        {displayName}
                    </h1>
                    <p className="text-gray-500">{displayProducts.length} products</p>
                </div>
                {displayProducts.length > 0 ? (
                    <div className="grid lg:grid-cols-3 gap-x-4 gap-y-8 pb-16">
                        {displayProducts.map(product => (
                            <CardProduct key={product.product_id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            No Products Found
                        </h3>
                        <p className="text-gray-600">
                            There are no products available in this category at the moment.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryProducts;