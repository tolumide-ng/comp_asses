import { Client, Message } from "yapople";
import { KeyCrypt } from "../../keyCrypt";
import { GetFuncInboxDef, UserMessagesDef } from "../index.model";

export const pop3 = {
    
}

export async function getPop3Inbox(props: GetFuncInboxDef) {
    const config = {
        host: props.host,
        port: props.port,
        tls: props.encType === "SSL/TLS",
        mailparser: true,
        username: props.email,
        password: props.password,
    };
    const client = new Client(config);

    const usersMessages: UserMessagesDef = { data: [], keys: "" };
    const userSpecificMessage: { [key: string]: Message[] } = { data: [] };

    try {
        await client.connect();

        if (props.action === "all") {
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
            const theMessage = await client.retrieve(props.msgNumber);

            userSpecificMessage.data = theMessage;

            // MAKE REQUEST TO DELETE THIS MESSAGE AFTER IT HAS BEEN READ
        }

        await client.quit();

        if (props.action === "all") {
            KeyCrypt.encrypt(
                {
                    email: props.email,
                    password: props.password,
                },
                usersMessages,
            );

            props.successHandler(usersMessages);
        } else {
            props.successHandler(userSpecificMessage);
        }
    } catch (error) {
        await client.quit();

        return props.errorHandler(error);
    }
}

export default { getPop3Inbox };
