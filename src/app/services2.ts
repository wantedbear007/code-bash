import axios, { AxiosResponse } from "axios";

const url: string = "https://judge0-ce.p.rapidapi.com/submissions";

const apiKey = process.env.NEXT_PUBLIC_PUBLICAPI_KEY;


const languageCodes: Record<string, number> = {
  cpp: 53,
  javascript: 63,
  java: 62,
  python: 71,
};

// for submission of code
export async function codeExec(
  code: string,
  language: string,
  input?: string
): Promise<string | undefined> {
  const payload = {
    source_code: code,
    language_id: languageCodes[language],
    stdin: input ? input : "",
    expected_output: "",
  };
  console.log("your code is");
  console.log(code);
  console.log("payload is ", payload);

  try {
    const response: AxiosResponse<any> = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": apiKey,
      },
    });

    if (response.status == 201) {
      const submissionToken: string = response.data.token;

      console.log("your token is ", submissionToken);
      const res: string | null = await getOutput(submissionToken);
      if (res == null) {
        return undefined;
      }
      return res;
    }
  } catch (err: any) {
    return undefined;
  }
}

// for getting the output
async function getOutput(token: string): Promise<string | null> {
  try {
    const response: AxiosResponse<any> = await axios.get(`${url}/${token}`, {
      headers: {
        "X-RapidAPI-Key": apiKey,
      },
    });
    console.log(response);

    if (response.status == 200) {
      const data = response.data;
      return response.data["stdout"];
    } else {
      console.log("error occurred !");
      return null;
    }
  } catch (err: any) {
    console.log(err);
    return null;
  }
}
