import { ChildProcessWithoutNullStreams } from "child_process";

import { IStreamLogger } from "../handlers/stream-logger.interface.js";
import { ICommand } from "./command.types.js";

export abstract class CommandExecutor<Input> {
  constructor(private logger: IStreamLogger) {}

  public async execute() {
    const input = await this.prompt();
    const command = this.build(input);
    const stream = this.spawn(command);
    this.processStream(stream, this.logger);
  }

  protected abstract prompt(): Promise<Input>;
  protected abstract build(input: Input): ICommand;
  protected abstract spawn(command: ICommand): ChildProcessWithoutNullStreams;
  protected abstract processStream(
    process: ChildProcessWithoutNullStreams,
    logger: IStreamLogger
  ): void;
}
