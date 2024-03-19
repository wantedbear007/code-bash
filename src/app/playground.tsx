"use client";
import Editor from "@monaco-editor/react";
import { useRef, useState } from "react";
import React from "react";
import LanguageSelector from "./LanguageSel";
import { codeExec } from "./services";

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
  async function runCode(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> {
    e.preventDefault();
    setBtnText("Running");

    const code: string = (editorRef.current as any).getValue();
    const input: string = (stdinRef.current as any).getValue();
    const response: string | undefined = await codeExec(code, language, input);
    console.log("your output is: ");

    setOutput(response!);
    setBtnText("runCode");
  }

  // props
  function selectLanguage(lan: string) {
    setLanguage(lan);
  }

  return (
<main className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
  <h1 className="text-3xl font-bold py-4 font-mono text-center">Coding Playground</h1>

  <div className="flex flex-col md:flex-row justify-center items-center w-full">
    <form className="w-full md:w-1/2 px-4 md:px-0 mx-10">
      <div className="mb-4">
        <label htmlFor="username" className="font-mono font-semibold">Username</label>
        <input

          id="username"
          type="text"
          placeholder="Enter your username"
          className="border mb-5 font-mono  border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
        />
        <LanguageSelector
          language={language}
          selectLanguage={selectLanguage}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="code" className="font-semibold font-mono">Write code below</label>
        <Editor
          defaultLanguage={language}
          className="border border-gray-400 rounded-md"
          height="50vh"
          theme="vs-dark"
          value={code}
          language={language}
          onChange={(val, event) => {
            setCode(val!);
          }}
          onMount={handleEditorDidMount}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="input" className="font-mono font-semibold">Write input if needed</label>
        <Editor
          className="border border-gray-400 rounded-md"
          height="10vh"
          onMount={handleStdInDidMount}
        />
      </div>

      <button
        onClick={runCode}
        className=" font-mono w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-all focus:outline-none"
      >
        {btnText}
      </button>
    </form>

    <div className="w-full md:w-1/2 px-4">
      <h2 className="text-xl font-bold mb-4">Output</h2>
      <Editor
        height="64vh"
        width="100%"
        value={output}
        className="border font-mono border-gray-400 rounded-md"
      />
    </div>
  </div>
</main>

  );
}
