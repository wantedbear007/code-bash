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
  const lang: string = language == "cpp" ? "c++" : language;
  console.log("language selectedc is ", lang)

  try {
    console.log ("before callingg !")
    const response = await APIService.post("/execute", {
      language: language == "cpp" ? "c++" : language,
      version: LANGUAGE_VERSIONS[language],
      files: [
        {
          content: sourceCode,
        },
      ],
    });

    console.log("after calling ", response)

    // if (response.status != 200) {
    //   throw new Error("internal error !");
    // }

    // resFiltered = response.data["run"]["output"];
  } catch (err: any) {
    resFiltered = err;
  } finally {
    return resFiltered;
  }
}
