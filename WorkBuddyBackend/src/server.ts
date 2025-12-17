import { httpServer } from "./app";
import { config } from "./config/config";
import { connectToDb } from "./db/db"

(async () => {
    try {

        await connectToDb();
        httpServer.listen(config.PORT, () => {
            console.log('Server is running on http://localhost:'+config.PORT);
        });

        // const encryption = new ClientEncryption(client, {
        //     keyVaultNamespace: "admin.datakeys",
        //     kmsProviders: {
        // local:   {
        //         key: Buffer.from("your-64-byte-base64-key", "base64")
        //     }
        //     }
        // });
    }catch(e) {
        //@ts-expect-error
        console.log(e.message);
    }    
})()