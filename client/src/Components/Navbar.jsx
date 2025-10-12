// Updated Navbar.jsx
import React, { useState, useRef, useEffect, useContext } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import DropdownMenu from './DropdownMenu';
import { toUrlSlug } from '../utils';
import { assets } from '../assets/asset';

const Navbar = () => {
    const {
        activeMenuKey,
        setActiveMenuKey,
        isHomePage,
        setSelectedCategory,
        categories
    } = useContext(AppContext);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [isHovered, setIsHovered] = useState(false);
    const [navHeight, setNavHeight] = useState(80);
    const navRef = useRef(null);
    const timeoutRef = useRef(null);

    const getSubCategories = (key) => {
        let parentName = key;
        const parentCat = categories?.find(c => c.category_name?.toUpperCase() === parentName.toUpperCase());
        if (!parentCat) return [];
        return categories.filter(c => c.parent_category_id === parentCat.category_id).map(c => ({
            label: c.category_name,
            category_id: c.category_id
        }));
    };

    const navLinks = [
        { name: 'SHOP', path: '/collection', category_id: 1 },
        { name: 'NEW IN', path: '/new-in', category_id: null },
        { name: 'BEST SELLERS', path: '/best-sellers', category_id: null },
        { name: 'ACCESSORIES', path: '/accessories', category_id: 4 },
        { name: 'CHILDREN', path: '/children', category_id: null },
        { name: 'MEN', path: '/men', category_id: null },
        { name: 'ABOUT', path: '/about', category_id: null },
        { name: 'FAQ', path: '/faq', category_id: null },
    ];

    const isScrolledOrHovered = !isHomePage || isHovered || activeMenuKey;

    useEffect(() => {
        if (navRef.current) {
            setNavHeight(navRef.current.offsetHeight);
        }
    }, [isHovered, activeMenuKey]);

    const handleMouseEnter = (name) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        const hasMenu = getSubCategories(name).length > 0;

        if (hasMenu) {
            setIsHovered(true);
            setActiveMenuKey(name);
        } else if (activeMenuKey) {
            setActiveMenuKey(null);
        }
    };

    const handleMouseLeave = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setIsHovered(false);
            setActiveMenuKey(null);
        }, 300);
    };

    const handleMouseEnterDropdown = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsHovered(true);
    };

    const handleMouseLeaveDropdown = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setIsHovered(false);
            setActiveMenuKey(null);
        }, 300);
    };

    const handleLinkClick = (categoryId) => {
        if (categoryId) {
            setSelectedCategory(categoryId);
        }
    };

    const getSections = (key) => getSubCategories(key);

    const getImages = (key) => {
        const sections = getSections(key);
        return sections.slice(0, 3).map(sec => {
            const cat = categories?.find(c => c.category_id === sec.category_id);
            const imageSrc = assets?.[cat?.category_image];
            return {
                src: imageSrc,
                text: sec.label
            };
        });
    };

    const renderNavLink = (link, i) => {
        const hasMenu = getSubCategories(link.name).length > 0;
        const linkIsActive = activeMenuKey === link.name;

        const navItemIsBlack = isScrolledOrHovered || (linkIsActive && !hasMenu);

        const linkClass = `group flex flex-col justify-center h-full text-[15px] relative`;

        const underlineClass = hasMenu ?
            `block h-[1px] mt-1 ${linkIsActive ? 'w-full' : 'w-0'} transition-all duration-300 ${isScrolledOrHovered ? 'bg-black' : 'bg-white'}`
            :
            `block h-[1px] mt-1 w-0 group-hover:w-full transition-all duration-300 ${navItemIsBlack ? 'bg-black' : 'bg-white'}`;

        return (
            <div
                key={i}
                className={linkClass}
                onMouseEnter={() => handleMouseEnter(link.name)}
                onMouseLeave={handleMouseLeave}
            >
                <Link
                    to={link.path}
                    onClick={() => handleLinkClick(link.category_id)}
                    className={`transition-colors duration-300 ${navItemIsBlack ? 'text-black' : 'text-white'}`}
                >
                    {link.name}
                    <span className={underlineClass} />
                </Link>
            </div>
        );
    };

    return (
        <>
            <nav
                ref={navRef}
                className={`absolute w-full flex items-center justify-between px-4 lg:px-24 transition-all duration-500 z-40
                ${isScrolledOrHovered
                        ? 'bg-[url("/background-pattern.png")] bg-repeat py-3 md:py-6'
                        : 'bg-transparent py-4 md:py-6'
                    }`}
            >
                {/* Logo */}
                <Link to="/" className="flex items-center">
                    <span
                        className={`logo-font text-2xl transition-colors duration-500 ${isScrolledOrHovered ? 'text-black' : 'text-white'}`}
                    >
                        NgXinh
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-4">
                    {navLinks.map((link, i) => renderNavLink(link, i))}
                </div>

                {/* Desktop Right Section */}
                <div className="hidden lg:flex items-center gap-6">
                    <button
                        aria-label="Cart"
                        className={`relative cursor-pointer transition-opacity hover:opacity-80 ${isScrolledOrHovered ? 'text-black' : 'text-white'}`}
                    >
                        <svg width="20" height="20" viewBox="0 0 14 14" fill="none">
                            <path
                                d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span
                            className={`absolute -top-2 -right-3 inline-flex items-center justify-center text-[10px] leading-none w-[18px] h-[18px] ${isScrolledOrHovered ? 'text-black' : 'text-white'}`}
                        >
                            3
                        </span>
                    </button>

                    {/* Search */}
                    <button
                        aria-label="Search"
                        className={`${isScrolledOrHovered ? 'text-black' : 'text-white'} hover:text-gray-500 transition-colors`}
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                    </button>

                    {/* Login */}
                    <button
                        className={`text-[15px] bg-transparent transition-colors duration-300 ${isScrolledOrHovered ? 'text-black' : 'text-white'} hover:text-gray-600`}
                    >
                        Login
                    </button>
                </div>

                {/* Mobile Hamburger Button */}
                <button
                    className={`lg:hidden flex items-center ${isScrolledOrHovered ? 'text-black' : 'text-white'} transition-colors duration-300`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                {/* Mobile Menu */}
                <div
                    className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col lg:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
                >
                    <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>

                    {navLinks.map((link, i) => (
                        <Link
                            key={i}
                            to={link.path}
                            onClick={() => {
                                setIsMenuOpen(false);
                                handleLinkClick(link.category_id);
                            }}
                        >
                            {link.name}
                        </Link>
                    ))}

                    <button className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500 hover:bg-gray-800">
                        Login
                    </button>
                </div>
            </nav>

            {/* Dropdown */}
            {activeMenuKey && getSubCategories(activeMenuKey).length > 0 &&
                createPortal(
                    <div
                        className="absolute left-0 w-full z-[50] hidden lg:block"
                        style={{ top: `${navHeight}px` }}
                        onMouseEnter={handleMouseEnterDropdown}
                        onMouseLeave={handleMouseLeaveDropdown}
                    >
                        <DropdownMenu
                            title={activeMenuKey}
                            sections={getSections(activeMenuKey)}
                            images={getImages(activeMenuKey)}
                        />
                    </div>,
                    document.body
                )}
        </>
    );
};

export default Navbar;