"use client";
import Editor from "@monaco-editor/react";
import { useRef, useState } from "react";
import React from "react";
import LanguageSelector from "./LanguageSel";
import { executeCode } from "./services";

export default function Playground() {
  const editorRef = useRef(null);
  const stdinRef = useRef(null);

  const [code, setCode] = useState<string>("console.log('hello')");
  const [language, setLanguage] = useState<string>("javascript");

  // languages

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

    const response: string = await executeCode(
      language,
      (editorRef.current as any).getValue()
    );
    console.log("response fro abc is ", response);
  }

  function getCode(e: any): void {
    e.preventDefault();
    console.log("values are : ", code);
  }

  function selectLanguage(lan: string) {
    setLanguage(lan);
  }

  return (
    // parent div
    <main className="">
      <h1 className="text-xl text-center antialiased font-mono font-bold py-2">
        Coding Playground
      </h1>
      <div className="px-2 py-2 min-h-screen flex flex-col justify-center items-center ">
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
            className="px-10 py-2 my-5 font-mono  rounded-lg bg-green-700 hover:bg-green-900 transition-all"
          >
            RunCode
          </button>
        </form>
        <div className="outputContainer"></div>
      </div>
    </main>
  );
}
