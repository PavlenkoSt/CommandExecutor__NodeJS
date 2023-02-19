import { FfmpegExecutor } from "commands/ffmpeg/ffmpeg.executor";
import { ConsoleLogger } from "out/console-logger/console-logger";

class App {
  async run() {
    new FfmpegExecutor(ConsoleLogger.getInstance()).execute();
  }
}

new App().run();
