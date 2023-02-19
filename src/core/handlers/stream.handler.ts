import { ChildProcessWithoutNullStreams } from "child_process";

import { IStreamLogger } from "./stream-logger.interface.js";

export class StreamHandler {
  constructor(private logger: IStreamLogger) {}

  processOutput(stream: ChildProcessWithoutNullStreams) {
    stream.stdout.on("data", (data) => {
      this.logger.log(data.toString());
    });

    stream.stderr.on("error", (err) => {
      this.logger.error(err.toString());
    });

    stream.on("close", () => {
      this.logger.end();
    });
  }
}
