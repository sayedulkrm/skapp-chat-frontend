export const usernameValidator = (username: string) => {
    const nameRegex = /^[a-zA-Z0-9\s]*$/;

    // Check if the name contains any characters other than letters and numbers
    if (!nameRegex.test(username)) {
        return { isValid: false, errorMessage: "Username is invalid" };
    }
};
