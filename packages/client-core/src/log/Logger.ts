export abstract class Logger {
    abstract debug(...args: any[]): void;

    abstract info(...args: any[]): void;

    abstract warn(...args: any[]): void;

    abstract error(...args: any[]): void;
}

class ConsoleLogger extends Logger {
    debug(...args: any[]): void {
        console.debug(args);
    }

    error(...args: any[]): void {
        console.error(args);
    }

    info(...args: any[]): void {
        console.log(args);
    }

    warn(...args: any[]): void {
        console.warn(args);
    }

}
