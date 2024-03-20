import { prismaInstance } from "../app";

export enum DatabaseResponses {
  operationFailed,
  operationSuccess,
}

export default class DatabaseServices {
  static async getCodes(): Promise<void> {
    try {
      await prismaInstance.sourcecodes.findMany({
        select: {
          id: true,
          language: true,
          sourceCode: true,
          stdin: true,
          stdout: true,
          username: true
        }
      })
    } catch (err: any) {

    } finally {

    }
  }

  static async submitCode(): Promise<void> {
    
  }
}
