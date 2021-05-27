import Pop3Client from "poplib";
import { GetFuncInboxDef } from "../";

// 9649 ----- 9550

// /**
//  * @param {Object} props - The parameters of the function
//  * @param {Function} props.errorHandler - The error handler function
//  * @param {string} props.port - The port to use for connection
//  * @param {host} props.host - The host to connect
//  * @param {encType} props.encType - Should be one of "SSL/TLS", "STARTTLS", or "Unencrypted"
//  * @param {email} props.email - Email of the user connecting
//  * @param {password} props.password - Password of the user connecting
//  */
export function getPop3Inbox(props: GetFuncInboxDef) {
    const client = new Pop3Client(props.port, props.host, {
        tlserrs: false,
        enabletls: true,
        // change debug to false in production
        debug: false,
    });

    // emitted when there is a network error
    client.on("error", function (err: { errno: number; message: string }) {
        if (err.errno === 111) {
            console.log("Unable to connect to server");
            props.errorHandler({ message: "Unable to connect to server" });
        } else {
            console.log("Server error occurred");
            props.errorHandler({
                message: "Internal Server Error: Please try again later",
            });
        }

        console.log(err);
        props.errorHandler(err);
    });

    // successful connection to remote server
    client.on("connect", function () {
        console.log("CONNECT success");
        client.login(props.email, props.password);
    });

    // authorization error
    client.on("invalid-state", function (cmd: any) {
        console.log("Invalid state. You tried calling " + cmd);
    });

    client.on("locked", function (cmd: any) {
        console.log(
            "Current command has not finished yet. You tried calling " + cmd,
        );
    });

    client.on("login", function (status: any, rawdata: any) {
        if (status) {
            console.log("LOGIN/PASS success");
            client.list();
        } else {
            console.log("LOGIN/PASS failed");
            client.quit();
        }
    });

    client.on(
        "list",
        function (
            status: boolean,
            msgcount: number,
            msgnumber: any,
            data: any,
            rawdata: any,
        ) {
            if (status === false) {
                console.log("LIST failed");
                client.quit();
            } else {
                console.log("LIST success with " + msgcount + " element(s)");

                // console.log("THE TOTAL DATA OBTAINED>>>>>>>>>>", data);
                let buffer = "";

                // console.log(data);
                // ab2str(data);
                console.log("the data", data);
                const b = Array.isArray(data);

                console.log(b);

                // console.log("TO STRING????", data.toString());

                // data.on("data", function (chunk: any) {
                //     buffer += chunk.toString("utf8");
                // });

                // data.once("end", () => {
                //     console.log(">>>>>>>>>> DONE", buffer);
                // });

                // let buffer = "";

                // ab2str(data);

                // console.log("WHAT THE RAW DATA IS>>>>>>>>>>>", rawdata);

                if (msgcount > 0) client.retr(1);
                else client.quit();
            }
        },
    );

    client.on(
        "retr",
        function (status: boolean, msgnumber: any, data: any, rawdata: any) {
            if (status === true) {
                console.log("RETR success for msgnumber " + msgnumber);
                // client.dele(msgnumber);
                // client.quit();

                console.log("typeof status", typeof status);
                console.log("typeof of msgnumber", msgnumber);
                console.log("typeof data", typeof data);
                console.log("typeof of rawdata", typeof rawdata);

                // console.log("THE DATA>>>>>>>>>", data);
                // console.log("THE RAWDATA>>>>>>>", rawdata);
            } else {
                console.log("RETR failed for msgnumber " + msgnumber);
                client.quit();
            }
        },
    );

    client.on(
        "dele",
        function (status: boolean, msgnumber: any, data: any, rawdata: any) {
            if (status === true) {
                console.log("DELE success for msgnumber " + msgnumber);
                client.quit();
            } else {
                console.log("DELE failed for msgnumber " + msgnumber);
                client.quit();
            }
        },
    );

    client.on("quit", function (status: boolean, rawdata: any) {
        if (status === true) console.log("QUIT success");
        else console.log("QUIT failed");
    });
}
