import { Client } from "yapople";

export const getPopInbox = () => {
    const client = new Client({
        host: "pop.mail.yahoo.com",
        port: 995,
        tls: true,
        mailparser: true,
        username: "tolumideshpein@yahoo.com",
        password: "sbfulpzkumdwgmaj",
        // options: {
        //     secureContext: {
        //         passphrase: "passphrase",
        //     },
        // },
    });
    (async () => {
        console.log("__________CONNECTION ESTABLISHED");
        await client.connect();
        const messages = await client.retrieveAll();
        console.log("THE MESSAGES>>>>>>>>", messages);
        messages.forEach((message) => {
            console.log(message);
        });
        await client.quit();
    })().catch(console.error);
};
