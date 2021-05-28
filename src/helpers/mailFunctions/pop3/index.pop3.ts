import { Client, Message } from "yapople";
import { GetFuncInboxDef, UserMessagesDef } from "../index.model";

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

    const usersMessages: UserMessagesDef = { data: [] };
    let userSpecificMessage: Message[] = [];

    try {
        console.log("EXECUTED");
        await client.connect();

        console.log("CONNECTED???");

        console.log("the action", props.action);
        console.log("the message number", props.msgNumber);

        if (props.action === "all") {
            console.log("SHOULDN'T BE WITHIN THIS");
            const messages = await client.retrieveAll();
            messages.forEach((message) => {
                const { date, messageId, priority, from, subject } = message;
                usersMessages.data.push({
                    date,
                    subject,
                    priority,
                    from: from[0],
                    messageId,
                });
            });
        }

        if (props.action === "one" && props.msgNumber) {
            console.log("SHOULD BE WITHIN THIS ONE ATM");
            const theMessage = await client.retrieve(props.msgNumber);

            console.log(
                "RETREIVED THE MESSAGE HERE>>>>>>>>>>>>>>>>>",
                theMessage,
            );

            userSpecificMessage = theMessage;

            // MAKE REQUEST TO DELETE THIS MESSAGE AFTER IT HAS BEEN READ
        }

        await client.quit();

        if (props.action === "all") {
            props.successHandler(usersMessages);
        } else {
            props.successHandler(userSpecificMessage);
        }
    } catch (error) {
        await client.quit();
        return props.errorHandler(error);
    }

    console.log("AWAT!!!!!!!!!!");
}
