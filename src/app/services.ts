import axios from "axios";
import { LANGUAGE_VERSIONS } from "./constants";

const APIService = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

export async function executeCode(
  language: string,
  sourceCode: string
): Promise<string> {
  let resFiltered: string = "error";

  try {
    const response = await APIService.post("/execute", {
      language: language,
      version: LANGUAGE_VERSIONS[language],
      files: [
        {
          content: sourceCode,
        },
      ],
    });

    if (response.status != 200) {
      throw new Error("internal error !");
    }

    resFiltered = response.data["run"]["output"];
  } catch (err: any) {
    resFiltered = err;
  } finally {
    return resFiltered;
  }
}
