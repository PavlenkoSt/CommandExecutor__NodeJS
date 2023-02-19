import { FfmpegExecutor } from "./commands/ffmpeg/ffmpeg.executor.js";
import { ConsoleLogger } from "./out/console-logger/console-logger.js";

class App {
  async run() {
    new FfmpegExecutor(ConsoleLogger.getInstance()).execute();
  }
}

new App().run();
