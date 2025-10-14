import React, { useContext } from 'react'
import { product_categories } from '../assets/asset.js'
import Card from './Card'
import { AppContext } from '../context/AppContext.jsx';
import { useNavigate } from 'react-router-dom'; // Thêm để navigate
import { toUrlSlug } from '../utils'; // Import để tạo slug cho URL

const Category = () => {
    const { setSelectedCategory } = useContext(AppContext);
    const navigate = useNavigate();

    const slicedCategories = product_categories.slice(0, 10)

    const rows = []
    const pattern = [3, 2]
    let startIndex = 0

    while (startIndex < slicedCategories.length) {
        for (let count of pattern) {
            const group = slicedCategories.slice(startIndex, startIndex + count)
            if (group.length === 0) break
            rows.push(group)
            startIndex += count
        }
    }

    const handleCategoryClick = (category) => {
        setSelectedCategory(category.category_id);
        navigate(`/collection/${toUrlSlug(category.category_name)}`);
    };

    return (
        <div className="w-full ">
            <div className="hidden lg:grid grid-cols-5 ">
                {slicedCategories.map((category, i) => (
                    <Card
                        key={category.category_id}
                        name={category}
                        index={i}
                        height="h-[500px]"
                        onClick={() => handleCategoryClick(category)}
                    />
                ))}
            </div>

            <div className="grid lg:hidden ">
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
                                onClick={() => handleCategoryClick(category)}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Category