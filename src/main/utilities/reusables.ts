export const readableErrors: { [keyt: string]: string } = {
    "401": "Username and Password does not match",
    "404": "Not Found",
};

export const appStatusText: { [keyt: string]: string } = {
    success: "You do not have any mail at the moment",
    rest: "Enter your email and password to view your mails",
    failure: "There was a problem fetching your mails",
    "rest-success": "Select a mail to view it",
    "rest-rest": "Please login to view a specific mail",
    "rest-failure": "There was a problem fetching your mails",
    "failure-success":
        "There was a problem fetching that mail, please try again later",
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
