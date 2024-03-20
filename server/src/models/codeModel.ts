export default interface codeModel {
  id?: number,
  username: string,
  language: string,
  sourceCode: string,
  stdin?: String | null,
  stdout?: String | null, 
  createdAt?:  Date 
}

/*
  {
    id: 3,
    username: 'bhanupratap',
    language: 'Java',
    sourceCode: 'public class HelloWorld {\n' +
      '    public static void main(String[] args) {\n' +
      '        System.out.println("Hello, world!");\n' +
      '    }\n' +
      '}',
    stdin: null,
    stdout: null,
    createdAt: 2024-03-20T08:17:23.508Z
  }
*/