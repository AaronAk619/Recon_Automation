export class Logger {

static info(message: string) {
console.log(`[INFO] ${message}`);
}

static success(message: string) {
console.log(`[SUCCESS] ${message}`);
}

static error(message: string) {
console.log(`[ERROR] ${message}`);
}

}