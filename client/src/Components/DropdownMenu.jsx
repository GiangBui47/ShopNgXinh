import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const DropdownMenu = ({ title, sections, images }) => {
    const { setSelectedCategory } = useContext(AppContext);

    const handleLinkClick = (item) => {
        if (item.category_id) {
            setSelectedCategory(item.category_id);
        }
    };

    const getItemSlug = (label) => {
        return label.toLowerCase();
    };

    return (
        <div
            className={`w-full bg-[url("/background-pattern.png")] bg-repeat  border-t border-gray-200 shadow-md`}>
            <div className="max-w-7xl mx-auto flex gap-10 py-10 px-12">
                <div className="w-1/4 flex-shrink-0">
                    <h3 className="uppercase tracking-wider  text-sm mb-4">
                        {title}
                    </h3>
                    <ul className="space-y-2 text-[15px] leading-relaxed ">
                        {sections.map((item, i) => {
                            const itemSlug = getItemSlug(item.label);
                            return (
                                <Link to={`/collection/${itemSlug}`} key={i} onClick={() => handleLinkClick(item)}>
                                    <li
                                        className={`cursor-pointer text-[#555555] hover:text-black transition-colors duration-200 
                                        ${item.highlight ? "text-yellow-700 font-semibold" : ""}
                                    `}
                                    >
                                        {item.label}
                                    </li>
                                </Link>
                            );
                        })}
                    </ul>
                </div>

                <div className="flex-1">
                    <div className="grid grid-cols-3 gap-6 h-[350px]">
                        {images.map((img, i) => {
                            const imgSlug = getItemSlug(img.text);
                            return (
                                <Link to={`/collection/${imgSlug}`} key={i} className="relative group overflow-hidden">
                                    <img
                                        src={img.src}
                                        alt={img.text}
                                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl group-hover:bg-opacity-70 transition-opacity duration-300">
                                        {img.text}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DropdownMenu;