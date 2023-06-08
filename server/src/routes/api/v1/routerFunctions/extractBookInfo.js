function extractBookInfo(volumeInfo) {
    const categoryArray = Array.isArray(volumeInfo.categories) ? volumeInfo.categories : [volumeInfo.categories];
    const categories = categoryArray.join(', ');
    const authorsArray = Array.isArray(volumeInfo.authors) ? volumeInfo.authors : [volumeInfo.authors];
    const authors = authorsArray.join(', ');
    return {
      title: volumeInfo.title,
      authors,
      pageCount: volumeInfo.pageCount,
      description: volumeInfo.description,
      categories,
      smallImage: volumeInfo.imageLinks.smallThumbnail,
      largeImage: volumeInfo.imageLinks.thumbnail
    };
}

export default extractBookInfo;