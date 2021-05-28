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
        // options: {
        //     secureContext: {
        //         passphrase: "passphrase",
        //     },
        // },
    };
    const client = new Client(config);

    const usersMessages: Array<{ [key: string]: string | Date | object }> = [];

    // (async () => {
    try {
        console.log("EXECUTED");
        await client.connect();

        console.log("CONNECTED???");
        // client.retrieveAll(function (err, messages) {
        //     console.log(">>>>>>>>RECEIVED MESSAGES");
        //     messages.forEach(function (message) {
        //         console.log(message.subject);
        //     });
        //     // client.quit();
        // });

        // console.log("MESSAGES YET???????????", messages);
        // messages.forEach((message: any) => {
        //     console.log(message.subject);
        // });

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
            // console.log("MESSAGE SUBJECT))))))))))", message.subject);
            // console.log(
            //     "WHOM WAS THIS MESSAGE SENT TO---------------",
            //     message.to,
            // );
            // console.log("WHOM WAS THE MESSAGE SENT FROM", message.from);
            // console.log("the message id is!!!!!!!!!!!!!!!", message.messageId);
        });

        console.log(
            "ALL MESSAGES RECEIVED>>>>>>>>>>>>>>>>>>>>>",
            usersMessages,
        );
        await client.quit();
    } catch (error) {
        console.log("AN ERROR OCCURED", error);
        await client.quit();
    }

    console.log("AWAT!!!!!!!!!!");
}
