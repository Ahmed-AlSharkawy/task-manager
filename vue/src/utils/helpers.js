export function catchFormErrors(error) {
    const result = { msg: null, fields: null };

    if (error.response) {
        // The request was made and the server responded with a status code
        if (error.response.status === 422) {
            // Validation error
            result.fields = error.response.data.errors;
        }
        // Other server error
        result.msg = error.response.data.message;
    } else if (error.request) {
        // The request was made but no response was received
        result.msg = "Network error. Please try again.";
    } else {
        // Something happened in setting up the request that triggered an error
        result.msg = "An unexpected error occurred. Please try again later.";
    }

    return result;
}

export function truncateText(text, length) {
    if (text.length <= length) return text; // Return the original text if its length is less than or equal to the specified length

    return text.slice(0, length) + "..."; // Return the truncated text with dots appended at the end
}
