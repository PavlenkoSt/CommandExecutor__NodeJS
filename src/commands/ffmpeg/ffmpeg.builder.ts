export class FfmpegBuilder {
  private path: string = "";
  private options: Map<string, string> = new Map();

  constructor() {
    this.options.set("-c:v", "libx264");
  }

  setPath(path: string): this {
    this.path = path;
    return this;
  }

  setVideoSize(width: number, height: number): this {
    this.options.set("-s", `${width}x${height}`);
    return this;
  }

  build(outputPath: string) {
    if (!this.path) throw new Error("Path is required");

    const args: string[] = ["-i", this.path];

    this.options.forEach((value, key) => {
      args.push(key);
      args.push(value);
    });

    args.push(outputPath);

    return args;
  }
}

const ffmp = new FfmpegBuilder().setPath("path");
