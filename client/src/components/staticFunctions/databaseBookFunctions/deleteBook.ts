const translateServerErrors = require("../../../services/translateServerErrors");

const deleteBook = async (id: string): Promise<void> => {
    try {
      const response = await fetch(`/api/v1/books/${id}`, {
        method: 'DELETE',
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      });
      if (!response.ok) {
        const errorBody = await response.json();
        const newError = translateServerErrors(errorBody);
        return newError;
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error(`Error in fetch: ${error}`);
    }
  };
  
  export default deleteBook;
  