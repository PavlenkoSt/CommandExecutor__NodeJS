import { ICommand } from "../../core/executor/command.types.js";

export interface IFfmpegCommandInput {
  width: number;
  height: number;
  path: string;
  name: string;
}

export interface ICommandExecFfmpeg extends ICommand {
  output: string;
}
