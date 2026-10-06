import Client from 'ssh2-sftp-client';
import fs from 'fs';

const sftp = new Client();

export class SftpService {

    async uploadFile(localPath: string,remotePath: string) {
        if (!fs.existsSync(localPath)) {
        throw new Error(`Local file not found: ${localPath}`);
    }
            await sftp.put(localPath,remotePath);
}

async connect() {

await sftp.connect({

host: process.env.SFTP_HOST,
port: Number(process.env.SFTP_PORT),
username: process.env.SFTP_USER,
privateKey: require('fs').readFileSync(process.env.PRIVATE_KEY_PATH!)

});

}
}