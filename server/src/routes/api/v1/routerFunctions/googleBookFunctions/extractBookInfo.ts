interface VolumeInfo {
    title: string;
    authors?: string[] | string;
    pageCount?: number;
    description?: string;
    categories?: string[] | string;
    imageLinks?: {
      smallThumbnail?: string;
      thumbnail?: string;
    };
  }
  
  interface BookInfo {
    title: string;
    authors: string;
    pageCount?: number;
    description?: string;
    categories: string;
    smallImage?: string;
    largeImage?: string;
  }
  
  function extractBookInfo(volumeInfo: VolumeInfo): BookInfo {
    const categoryArray: string[] = Array.isArray(volumeInfo.categories)
      ? volumeInfo.categories
      : [volumeInfo.categories || ''];
    const categories: string = categoryArray.join(', ');
  
    const authorsArray: string[] = Array.isArray(volumeInfo.authors)
      ? volumeInfo.authors
      : [volumeInfo.authors || ''];
    const authors: string = authorsArray.join(', ');
  
    return {
      title: volumeInfo.title,
      authors,
      pageCount: volumeInfo.pageCount,
      description: volumeInfo.description,
      categories,
      smallImage: volumeInfo.imageLinks?.smallThumbnail,
      largeImage: volumeInfo.imageLinks?.thumbnail,
    };
  }
  
  export default extractBookInfo;
  