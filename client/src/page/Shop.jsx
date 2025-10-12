import React from 'react'
import { product_categories, products, product_collections, seasonal_collections } from '../assets/asset.js'
import Card from '../Components/Card.jsx'

const Shop = () => {
    const winterCollection = seasonal_collections.find(collection => collection.collection_id === 3)
    if (!winterCollection) {
        return <div className='min-h-screen pt-16'>No winter collection found.</div>
    }

    const winterProductIds = product_collections
        .filter(pc => pc.collection_id === winterCollection.collection_id)
        .map(pc => pc.product_id)

    const winterCategoryIds = [...new Set(
        winterProductIds.map(productId => products.find(p => p.product_id === productId)?.category_id)
    )].filter(Boolean)

    const winterCategories = product_categories.filter(category => winterCategoryIds.includes(category.category_id))

    const rows = []
    const pattern = [3, 2]
    let startIndex = 0

    while (startIndex < winterCategories.length) {
        for (let count of pattern) {
            const group = winterCategories.slice(startIndex, startIndex + count)
            if (group.length === 0) break
            rows.push(group)
            startIndex += count
        }
    }

    return (
        <div className='min-h-screen pt-16'>
            <h1 className="text-4xl font-bold text-center mb-8">Winter Collection</h1>
            <div className="w-full">
                <div className="hidden lg:grid grid-cols-5">
                    {winterCategories.slice(0, 10).map((category, i) => (
                        <Card
                            key={category.category_id}
                            name={category}
                            index={i}
                            height="h-[500px]"
                        />
                    ))}
                </div>

                <div className="grid lg:hidden">
                    {rows.map((group, rowIndex) => (
                        <div
                            key={rowIndex}
                            className={`grid ${rowIndex % 2 === 0 ? 'grid-cols-3' : 'grid-cols-2'}`}
                        >
                            {group.map((category, i) => (
                                <Card
                                    key={category.category_id}
                                    name={category}
                                    index={i}
                                    height="h-[350px]"
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Shop