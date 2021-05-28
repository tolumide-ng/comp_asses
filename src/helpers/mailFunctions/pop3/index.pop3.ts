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

    try {
        console.log("EXECUTED");
        await client.connect();

        console.log("CONNECTED???");

        await client.connect();

        if (props.action === "all") {
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
        }

        if (props.action === "one") {
        }

        await client.quit();
        props.successHandler(usersMessages);
    } catch (error) {
        await client.quit();
        return props.errorHandler(error);
    }

    console.log("AWAT!!!!!!!!!!");
}
