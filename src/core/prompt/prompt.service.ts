import inquirer from "inquirer";

import { PromptType } from "core/prompt/prompt.types";

export class PromptService {
  public async input<T>(message: string, type: PromptType) {
    const { result } = await inquirer.prompt<{ result: T }>([
      {
        name: "result",
        type,
        message,
      },
    ]);

    return result;
  }
}
