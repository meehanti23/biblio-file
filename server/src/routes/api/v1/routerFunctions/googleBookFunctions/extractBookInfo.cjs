"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function extractBookInfo(volumeInfo) {
    var _a, _b;
    var categoryArray = Array.isArray(volumeInfo.categories)
        ? volumeInfo.categories
        : [volumeInfo.categories || ''];
    var categories = categoryArray.join(', ');
    var authorsArray = Array.isArray(volumeInfo.authors)
        ? volumeInfo.authors
        : [volumeInfo.authors || ''];
    var authors = authorsArray.join(', ');
    return {
        title: volumeInfo.title,
        authors: authors,
        pageCount: volumeInfo.pageCount,
        description: volumeInfo.description,
        categories: categories,
        smallImage: (_a = volumeInfo.imageLinks) === null || _a === void 0 ? void 0 : _a.smallThumbnail,
        largeImage: (_b = volumeInfo.imageLinks) === null || _b === void 0 ? void 0 : _b.thumbnail,
    };
}

module.exports = extractBookInfo;
