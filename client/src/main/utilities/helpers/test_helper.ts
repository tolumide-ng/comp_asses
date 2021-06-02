export const generateRowContent = () => ({
    date: "2019-01-25",
    subject: "SUBJECT OF THE EMAIL",
    from: { address: "Tiolumide", name: "Tiolumide Shopein" },
    index: 1,
    handleSpecificMail: jest.fn(),
});

export const generateSpecificMailContent = () => ({
    html: "<p>the html text</p>",
    subject: "subject of the email",
    messagedId: "messageId",
    from: { name: "senders name", address: "address@email.com" },
    to: "examplae@example.com",
    date: "27-02-1994",
});
