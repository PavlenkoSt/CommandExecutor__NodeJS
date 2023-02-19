import { ChildProcessWithoutNullStreams, spawn } from "child_process";

import { CommandExecutor } from "core/executor/command.executor";
import { FilesService } from "core/files/files.service";
import { IStreamLogger } from "core/handlers/stream-logger.interface";
import { StreamHandler } from "core/handlers/stream.handler";
import { PromptService } from "core/prompt/prompt.service";
import { FfmpegBuilder } from "./ffmpeg.builder";

import { ICommandExecFfmpeg, IFfmpegCommandInput } from "./ffmpeg.types";

export class FfmpegExecutor extends CommandExecutor<IFfmpegCommandInput> {
  private fileService: FilesService = new FilesService();
  private promptService: PromptService = new PromptService();

  constructor(logger: IStreamLogger) {
    super(logger);
  }

  protected async prompt(): Promise<IFfmpegCommandInput> {
    const width = await this.promptService.input<number>("Width", "number");
    const height = await this.promptService.input<number>("Height", "number");
    const path = await this.promptService.input<string>("Path", "input");
    const name = await this.promptService.input<string>("Filename", "input");

    return {
      width,
      height,
      name,
      path,
    };
  }
  protected build({
    width,
    height,
    name,
    path,
  }: IFfmpegCommandInput): ICommandExecFfmpeg {
    const output = this.fileService.getFilePath(path, name, "mp4");

    const args = new FfmpegBuilder()
      .setPath(path)
      .setVideoSize(width, height)
      .build(output);

    return {
      command: "ffmpeg",
      args,
      output,
    };
  }
  protected spawn({
    args,
    command,
    output,
  }: ICommandExecFfmpeg): ChildProcessWithoutNullStreams {
    this.fileService.removeIfExist(output);
    return spawn(command, args);
  }
  protected processStream(
    process: ChildProcessWithoutNullStreams,
    logger: IStreamLogger
  ): void {
    const handler = new StreamHandler(logger);
    handler.processOutput(process);
  }
}
