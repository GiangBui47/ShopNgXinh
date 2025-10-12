/**
 * Chuyển đổi một chuỗi thành dạng slug an toàn cho URL.
 * Ví dụ: "Skirts & Shorts" -> "skirts-shorts"
 * @param {string} text Chuỗi cần chuyển đổi
 * @returns {string} Chuỗi đã được chuyển thành slug
 */
export const toUrlSlug = (text) => {
    if (!text) return '';
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/ & /g, '-')      // Thay thế ' & ' bằng '-'
        .replace(/\s+/g, '-')      // Thay thế khoảng trắng bằng '-'
        .replace(/[^\w\-]+/g, '')  // Xóa các ký tự không phải chữ, số, gạch dưới, gạch ngang
        .replace(/\-\-+/g, '-');   // Thay thế nhiều dấu '-' liên tiếp bằng một dấu '-'
};