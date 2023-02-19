import { IStreamLogger } from "../../core/handlers/stream-logger.interface.js";

export class ConsoleLogger implements IStreamLogger {
  private static logger: IStreamLogger;

  public static getInstance() {
    if (!this.logger) {
      this.logger = new ConsoleLogger();
    }

    return this.logger;
  }

  log(...args: any[]): void {
    console.log(...args);
  }
  error(...args: any[]): void {
    console.log(...args);
  }
  end(): void {
    console.log("Done");
  }
}
