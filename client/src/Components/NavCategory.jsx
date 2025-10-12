import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toUrlSlug } from '../utils';

const NavCategory = () => {
    const location = useLocation();
    const { activeMenuKey, setSelectedCategory, categories } = useContext(AppContext);

    const getSubCategories = (key) => {
        let parentName = key;
        const parentCat = categories?.find(c => c.category_name?.toUpperCase() === parentName.toUpperCase());
        if (!parentCat) return [];
        const basePath = '/collection';
        return categories
            .filter(c => c.parent_category_id === parentCat.category_id)
            .map(c => {
                const slug = toUrlSlug(c.category_name);
                if (!slug) return null;
                return {
                    label: c.category_name,
                    path: `${basePath}/${slug}`.replace(/\/+$/, ''),
                    category_id: c.category_id
                };
            })
            .filter(Boolean);
    };

    const navLinks = [
        { name: 'SHOP', path: '/collection' },
        { name: 'NEW IN', path: '/new-in' },
        { name: 'BEST SELLERS', path: '/best-sellers' },
        { name: 'ACCESSORIES', path: '/accessories' },
        { name: 'CHILDREN', path: '/children' },
        { name: 'MEN', path: '/men' },
    ];
    const urlMenuKey = navLinks.find(link =>
        link.path !== '/' && location.pathname.startsWith(link.path)
    )?.name;

    const currentKey = activeMenuKey || urlMenuKey;

    if (!currentKey) {
        return null;
    }

    const subNavLinks = getSubCategories(currentKey);

    if (subNavLinks.length === 0) {
        return null;
    }

    const handleSubLinkClick = (link) => {
        if (link.category_id) {
            setSelectedCategory(link.category_id);
        }
    };

    return (
        <div
            style={{
                fontFamily: '"Libre Baskerville", "Times New Roman", serif',
                fontSize: "13px",
            }}
            className={`
                 left-0  w-full pt-24  flex flex-wrap items-center justify-center z-30 
                transition-all duration-500 ease-out
            `} >
            {subNavLinks.map((link, index) => (
                <Link
                    key={index}
                    to={link.path}
                    onClick={() => handleSubLinkClick(link)}
                    className={`px-3 py-1 m-1 text-[#555555] whitespace-nowrap cursor-pointer transition-colors duration-200 
                        hover:text-black hover:underline
                        ${location.pathname === link.path ? 'text-black font-semibold underline' : ''} 
                    `}
                >
                    <span>{link.label}</span>
                </Link>
            ))}
        </div>
    );
};

export default NavCategory;