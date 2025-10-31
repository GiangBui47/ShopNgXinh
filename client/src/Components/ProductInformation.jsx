import React, { useContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { product_inventory, products } from "../assets/asset";
import { AppContext } from "../context/AppContext";

const ProductInformation = () => {
    const [activeTab, setActiveTab] = useState("description");
    const [showColors, setShowColors] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams()
    const [product, setProduct] = useState(null);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([])
    const [selectedSize, setSelectedSize] = useState(null);
    const { sku } = useParams();
    const { addToCart, selectedColor, setSelectedColor } = useContext(AppContext)

    useEffect(() => {
        const productData = products.find(p => p.sku === sku);
        if (productData) {
            setProduct(productData);
            const allProduct = product_inventory.filter(c => c.product_id === productData.product_id);
            const uniqueColors = allProduct.reduce((acc, item) => {
                if (!acc.find(c => c.color === item.color)) {
                    acc.push(item);
                }
                return acc;
            }, []);
            setColors(uniqueColors);

            const uniqueSizes = allProduct.reduce((acc, item) => {
                if (!acc.find(c => c.size === item.size)) {
                    acc.push(item);
                }
                return acc;
            }, []);

            setSizes(uniqueSizes);

            const urlColor = searchParams.get('color');
            if (urlColor) {
                const decodedColor = decodeURIComponent(urlColor);
                const matchingColor = uniqueColors.find(c => c.color === decodedColor);
                if (matchingColor) {
                    setSelectedColor(decodedColor);
                } else if (uniqueColors.length > 0) {
                    setSelectedColor(uniqueColors[0].color);
                }
            } else if (uniqueColors.length > 0) {
                setSelectedColor(uniqueColors[0].color);
            }

            const urlSize = searchParams.get('size');
            if (urlSize) {
                const decodedSize = decodeURIComponent(urlSize);
                const matchingSize = uniqueSizes.find(c => c.size === decodedSize);
                if (matchingSize) {
                    setSelectedSize(decodedSize);
                } else if (uniqueSizes.length > 0) {
                    setSelectedSize(uniqueSizes[0].size);
                }
            } else if (uniqueSizes.length > 0) {
                setSelectedSize(uniqueSizes[0].size);
            }
        }
    }, [sku, searchParams, setSelectedColor]);

    const handleSizeSelect = (sizeName) => {
        setSelectedSize(sizeName);
        setSearchParams({
            ...(searchParams.get('color') && { color: searchParams.get('color') }),
            size: encodeURIComponent(sizeName)
        });
    };

    const handleColorSelect = (colorName) => {
        setSelectedColor(colorName);
        setShowColors(false);
        setSearchParams({
            color: encodeURIComponent(colorName),
            ...(searchParams.get('size') && { size: searchParams.get('size') })
        });
    };

    return product && (
        <div className="flex flex-col">
            <h2 className="">{product.product_name}</h2>
            <div className="flex text-gray-700 mb-4 gap-4">
                <h3 className="">
                    {selectedColor || 'Select a color'}
                </h3>
                <h3> - </h3>
                <h3>{product.price ? `$${product.price.toFixed(2)}` : 'Price'}</h3>
            </div>
            <div className="flex items-center mb-3 gap-2 ">
                <h4 onClick={() => setActiveTab(activeTab === "description" ? null : 'description')}
                    className={`cursor-pointer ${activeTab === "description" ? "border-b-1 border-black " : ""}`}>DESCRIPTION</h4>
                -
                <h4 onClick={() => setActiveTab(activeTab === "detail" ? null : 'detail')}
                    className={`cursor-pointer ${activeTab === "detail" ? "border-b-1 border-black " : ""}`}>DETAIL</h4>
            </div>
            <div>
                {activeTab === "description" && (
                    <div className="text-[13px] mb-3 space-y-3">
                        <p className="text-gray-600 text-lg">
                            {product.product_description}
                        </p>
                        <p>
                            Material: {product.material}
                        </p>
                        <p>
                            Intructions: {product.care_instructions}
                        </p>
                        <p>
                            Sustainability: {product.sustainability_info}
                        </p>
                    </div>
                )}
                {activeTab === "detail" && (
                    <p className="text-gray-600 mb-4">
                        detail
                    </p>
                )}
            </div>

            <div
                className="relative inline-block mb-4 "
                onMouseEnter={() => setShowColors(true)}
                onMouseLeave={() => setShowColors(false)}
            >
                <div className="cursor-pointer px-2 py-4 border border-gray-300 rounded ">
                    {selectedColor || 'Select a color'}
                </div>
                {showColors && (
                    <div className="absolute top-full left-0  border bg-white border-gray-300 rounded shadow-lg z-10 w-full max-h-[150px] overflow-y-scroll">
                        {colors.map((colorItem) => (
                            <div
                                key={colorItem.color_id}
                                className="px-3 py-4 cursor-pointer hover:bg-gray-300"
                                onClick={() => handleColorSelect(colorItem.color)}
                            >
                                {colorItem.color}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div>
                {sizes.length > 0 && sizes.map((sizeItem) => (
                    <div
                        key={sizeItem.size_id || sizeItem.size}
                        className={`border border-gray-300 px-3 py-3 inline-block mb-2 cursor-pointer mr-2 ${selectedSize === sizeItem.size ? 'border-gray-950' : ''}`}
                        onClick={() => handleSizeSelect(sizeItem.size)}
                    >
                        {sizeItem.size}
                    </div>
                ))}
            </div>

            <button
                className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
                onClick={() => addToCart({
                    product_id: product.product_id,
                    color: selectedColor,
                    size: selectedSize
                })}
                disabled={!selectedColor || !selectedSize}
            >
                Thêm vào giỏ hàng
            </button>
        </div>
    )
}

export default ProductInformation;