import axios, { AxiosResponse, responseEncoding } from "axios";

const url: string = "https://judge0-ce.p.rapidapi.com/submissions";

const apiKey: string = "";

const code: string = `
#include <stdio.h>

int main() {
    printf("Hello, world!");
    return 0;
}
`;

const languageCodes:  Record<string, number> =  {
  cpp: 54,
  javascript: 63,
  java: 62,
  python: 71
}

const payload = {
  source_code: code,
  language_id: 50,
  stdin: "",
  expected_output: "",
};

// for getting the output
async function getOutput(token: string) {
  try {
    const response: AxiosResponse<any> = await axios.get(
      `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
      {
        headers: {
          "X-RapidAPI-Key": apiKey,
        },
      }
    );
    console.log(response);

    if (response.status == 200) {
      const data = response.data;
      console.log("your data is ", data);
    } else {
      console.log("error occurred !");
    }
  } catch (err: any) {
    console.log(err);
  }
}

// for submission of code
export async function codeExec(): Promise<void> {
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
      getOutput(submissionToken);
    }
  } catch (err: any) {
  } finally {
  }
}
