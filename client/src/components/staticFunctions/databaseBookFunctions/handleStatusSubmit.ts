const translateServerErrors = require("../../../services/translateServerErrors");

const handleStatusSubmit = async (
    id: string,
    setNewBookStatus: React.Dispatch<React.SetStateAction<string>>,
    setErrors: React.Dispatch<React.SetStateAction<any>>,
    selectedStatus: string
  ): Promise<void> => {
    try {
      const response = await fetch(`/api/v1/books/${id}`, {
        method: 'PATCH',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({ bookStatus: selectedStatus })
      });
      if (!response.ok) {
        const errorBody = await response.json();
        const newError = translateServerErrors(errorBody);
        return setErrors(newError);
      } else {
        const responseBody = await response.json();
        const updatedStatus = responseBody.bookStatus;
        setNewBookStatus(updatedStatus);
        window.location.reload();
      }
    } catch (error) {
      console.error(`Error in fetch: ${error}`);
    }
  };
  
  export default handleStatusSubmit;
  