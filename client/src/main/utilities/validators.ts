export const isEmailValid = (email: string) =>
    /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,})+$/.test(email);
