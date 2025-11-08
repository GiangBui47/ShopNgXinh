import React, { useContext, useEffect, useState, useMemo } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import ProductInformation from "../Components/ProductInformation";
import CardProduct from "../Components/CardProduct";
import { Link, useParams } from "react-router-dom";
import { assets, product_images, product_inventory } from "../assets/asset";
import { AppContext } from "../context/AppContext";
import { toUrlSlug } from "../utils";

const ProductDetail = () => {
    const [product, setProduct] = useState(null);
    const [images, setImages] = useState([]);
    const [mainIndex, setMainIndex] = useState(0);
    const [thumbIndex, setThumbIndex] = useState(0);
    const { sku } = useParams();
    const { products, selectedCategory, categories, setSelectedCategory, selectedColor, setSelectedColor } = useContext(AppContext)

    useEffect(() => {
        const productData = products.find(p => p.sku === sku);
        if (productData) {
            setProduct(productData);
            setSelectedCategory(productData.category_id)
        }
    }, [sku, products, setSelectedCategory]);

    useEffect(() => {
        if (!product) return;

        let colorName = selectedColor;
        const colorsForProduct = product_inventory.filter(c => c.product_id === product.product_id);

        if (!colorName && colorsForProduct.length > 0) {
            colorName = colorsForProduct[0].color;
            setSelectedColor(colorName);
        }

        if (colorName) {
            const currentColorObj = colorsForProduct.find(c => c.color === colorName);
            if (currentColorObj) {
                const filteredImages = product_images.filter(img => img.product_id === product.product_id && img.color_code === currentColorObj.color_code);
                setImages(filteredImages);
                setMainIndex(0);
                setThumbIndex(0);
            }
        }
    }, [product, selectedColor, setSelectedColor, product_images]);

    const category = categories.find((cate) => cate.category_id == selectedCategory);

    const relatedProducts = useMemo(() => {
        if (!product) return [];
        return products.filter(p => p.category_id === product.category_id && p.sku !== sku);
    }, [product, sku, products]);

    const totalThumbs = images.length;
    const visibleThumbs = 4;

    const mainImage = images.length > 0 ? assets[images[mainIndex]?.image_url] : null;

    const getVisibleIndices = (startIndex) => {
        if (totalThumbs <= visibleThumbs) {
            return Array.from({ length: totalThumbs }, (_, i) => i);
        }
        const indices = [];
        let current = startIndex;
        for (let i = 0; i < visibleThumbs; i++) {
            indices.push(current);
            current = (current + 1) % totalThumbs;
        }
        return indices;
    };

    const visibleIndices = getVisibleIndices(thumbIndex);


    const handlePrev = () => {
        if (totalThumbs === 0) return;
        const newIndex = (mainIndex - 1 + totalThumbs) % totalThumbs;
        setMainIndex(newIndex);
    };

    const handleNext = () => {
        if (totalThumbs === 0) return;
        const newIndex = (mainIndex + 1) % totalThumbs;
        setMainIndex(newIndex);
    };

    const handleThumbPrev = () => {
        if (totalThumbs <= visibleThumbs) return;
        const newMain = (mainIndex - 1 + totalThumbs) % totalThumbs;
        setMainIndex(newMain);
        setThumbIndex(prev => {
            let newThumb = prev;
            if (newMain < prev) {
                newThumb = newMain;
            } else if (newMain >= prev + visibleThumbs) {
                newThumb = newMain - visibleThumbs + 1;
            }
            return newThumb;
        });
    };

    const handleThumbNext = () => {
        if (totalThumbs <= visibleThumbs) return;
        const newMain = (mainIndex + 1) % totalThumbs;
        setMainIndex(newMain);
        setThumbIndex(prev => {
            let newThumb = prev;
            if (newMain < prev) {
                newThumb = newMain;
            } else if (newMain >= prev + visibleThumbs) {
                newThumb = newMain - visibleThumbs + 1;
            }
            return newThumb;
        });
    };


    const handleThumbClick = (actualIndex) => {
        setMainIndex(actualIndex);
        setThumbIndex(prev => {
            if (actualIndex < prev) {
                return actualIndex;
            } else if (actualIndex >= prev + visibleThumbs) {
                return actualIndex - visibleThumbs + 1;
            }
            return prev;
        });
    };

    return product && (
        <div className="pt-24 px-4 lg:px-16">
            <div>
                <div className="flex mb-5 space-x-2 items-center cursor-pointer">
                    <Link to="/">Shop</Link>
                    <p>/</p>
                    <Link to={`/collection/${toUrlSlug(category?.category_name)}`}> {category?.category_name.toLowerCase()} </Link>
                    <p>/</p>
                    <p className="cursor-default">{product.product_name}</p>
                </div>
                <div className="grid lg:grid-cols-2 gap-8">
                    <div className="flex flex-col items-center space-y-4">
                        <div className="relative w-full ">
                            {mainImage && (
                                <img
                                    src={mainImage}
                                    alt="Main"
                                    className="w-full h-[600px] rounded-lg transition-all duration-300 object-cover"
                                />
                            )}
                            <button
                                onClick={handlePrev}
                                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow p-2 hover:bg-gray-100 disabled:opacity-50"
                                disabled={totalThumbs === 0}
                            >
                                <GrPrevious />
                            </button>
                            <button
                                onClick={handleNext}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow p-2 hover:bg-gray-100 disabled:opacity-50"
                                disabled={totalThumbs === 0}
                            >
                                <GrNext />
                            </button>
                        </div>

                        {totalThumbs > 0 && (
                            <div className="relative w-full">
                                <div className="overflow-hidden rounded-lg">
                                    <div
                                        className="flex transition-transform duration-300 ease-in-out"
                                    >
                                        {visibleIndices.map((idx) => (
                                            <div key={idx} className="w-1/4 flex-shrink-0 px-1">
                                                <img
                                                    src={assets[images[idx]?.image_url]}
                                                    alt={`Thumb ${idx + 1}`}
                                                    className={`w-full h-20 rounded-lg object-cover cursor-pointer hover:opacity-80 transition-opacity ${idx === mainIndex ? "ring-2 ring-black" : ""}`}
                                                    onClick={() => handleThumbClick(idx)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {totalThumbs > visibleThumbs && (
                                    <>
                                        <button
                                            onClick={handleThumbPrev}
                                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow p-2 hover:bg-gray-100 z-10"
                                        >
                                            <GrPrevious size={16} />
                                        </button>
                                        <button
                                            onClick={handleThumbNext}
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow p-2 hover:bg-gray-100 z-10"
                                        >
                                            <GrNext size={16} />
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                    <ProductInformation />
                </div>

                {relatedProducts.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {relatedProducts.slice(0, 4).map((relatedProduct) => (
                                <CardProduct key={relatedProduct.sku} product={relatedProduct} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;