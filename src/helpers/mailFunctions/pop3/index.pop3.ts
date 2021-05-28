import { Client } from "yapople";
import { GetFuncInboxDef } from "../index.model";

export async function getPop3Inbox(props: GetFuncInboxDef) {
    console.log("HERE NOW---------------");
    const config = {
        host: props.host,
        port: props.port,
        tls: props.encType === "SSL/TLS",
        mailparser: true,
        username: props.email,
        password: props.password,
    };
    const client = new Client(config);

    const usersMessages: Array<{ [key: string]: string | Date | object }> = [];

    // (async () => {
    try {
        console.log("EXECUTED");
        await client.connect();

        console.log("CONNECTED???");

        await client.connect();
        const messages = await client.retrieveAll();

        messages.forEach((message) => {
            const { date, messageId, priority, from, subject } = message;
            usersMessages.push({
                date,
                subject,
                priority,
                from,
                messageId,
            });
        });

        // console.log(
        //     "ALL MESSAGES RECEIVED>>>>>>>>>>>>>>>>>>>>>",
        //     usersMessages,
        // );

        await client.quit();
        props.successHandler(usersMessages);
    } catch (error) {
        console.log("AN ERROR OCCURED", error);

        await client.quit();
        props.errorHandler(error);
    }

    console.log("AWAT!!!!!!!!!!");
}
