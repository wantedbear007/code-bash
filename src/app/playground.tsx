"use client";
import Editor from "@monaco-editor/react";
import { useRef, useState } from "react";
import React from "react";
import LanguageSelector from "./LanguageSel";
import { executeCode } from "./services";
import { codeExec } from "./services2";

export default function Playground() {
  const editorRef = useRef(null);
  const stdinRef = useRef(null);

  const [code, setCode] = useState<string>("// start writing your code ");
  const [language, setLanguage] = useState<string>("javascript");
  const [output, setOutput] = useState<string>("");
  const [btnText, setBtnText] = useState<string>("runCode");


  // for handling editor code
  function handleEditorDidMount(editor: any) {
    editorRef.current = editor;
    editor.focus();
  }

  // for handling user stdin input
  function handleStdInDidMount(editor: any) {
    stdinRef.current = editor;
  }

  // run code handler
  async function runCode(e: any): Promise<void> {
    e.preventDefault();
    setBtnText("Running");

    codeExec()
    // const code: string = (editorRef.current as any).getValue();
    // console.log("code is ", code)

    // const response: string = await executeCode(language, code);

    // setOutput(response);
    // setBtnText("runCode");
  }

  // props
  function selectLanguage(lan: string) {
    setLanguage(lan);
  }

  return (
    <main className="">
      <h1 className="text-xl text-center antialiased font-mono font-bold py-2">
        Coding Playground
      </h1>

      <div className="px-2 py-2 min-h-screen flex flex-row justify-center items-center ">
        <div>
          <form>
            <div>
              <label className="font-semibold" htmlFor="username">
                Username
              </label>
              <input
                className="border mx-5  border-black rounded-md px-2 py-1"
                placeholder="Enter your username"
                id="username"
                type="text"
              />
              <label className="font-semibold">Language</label>
              <LanguageSelector
                language={language}
                selectLanguage={selectLanguage}
              />
            </div>
            <>
              <label>Write code below</label>
              <br></br>
              <Editor
                defaultLanguage={language}
                className="border border-black rounded-md"
                height="50vh"
                theme="vs-dark"
                value={code}
                language={language}
                onChange={(val, event) => {
                  setCode(val!);
                }}
                // defaultLanguage="javascript"
                onMount={handleEditorDidMount}
              />
            </>
            <>
              <label>Write input if needed</label>
              <br></br>
              <Editor
                className="border border-black rounded-md"
                height="10vh"
                onMount={handleStdInDidMount}
              />
            </>
            <button
              onClick={runCode}
              className="px-10 text-white py-2 my-5 font-mono  rounded-lg bg-green-700 hover:bg-green-900 transition-all"
            >
              {btnText}
            </button>
          </form>
        </div>

        <div className="px-10">
          <h2>Output</h2>

          <Editor
            height="64vh"
            // width="65vw"
            width="70vh"
            value={output}
            className="border border-black rounded-md"
          />
        </div>
      </div>
    </main>
  );
}
