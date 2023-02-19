import { ChildProcessWithoutNullStreams } from "child_process";

import { ICommand } from "core/executor/command.types";
import { IStreamLogger } from "core/handlers/stream-logger.interface";

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
