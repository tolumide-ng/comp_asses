export const readableErrors: { [keyt: string]: string } = {
    "401": "Username and Password does not match",
    "404": "Not Found",
};

export const appStatusText: { [keyt: string]: string } = {
    fetchAllMailsSuccess: "You do not have any mail at the moment",
    rest: "Enter your email and password to view your mails",
    fetchAllMailsFailure: "There was a problem fetching your mails",
};

export const getInitials = (name: string): string => {
    if (name) {
        const splitName = name.trim().split(" ");

        if (splitName.length > 1) {
            return (
                splitName[0][0].toLocaleUpperCase() +
                splitName[splitName.length - 1][0].toLocaleUpperCase()
            );
        }

        return splitName[0][0].toLocaleUpperCase();
    }

    return "";
};
