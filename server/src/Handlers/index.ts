import { Request, Response } from "express";
import { prismaInstance } from "../app";
import codeModel from "../models/codeModel";

export default class Operations {
  // to upload code
  static async uploadSnippet(req: Request, res: Response) {
    const { username, language, sourceCode, stdin, stdout } = req.body;

    if (!(username && language && sourceCode)) {
      res.status(203).json({
        message: "all fields are required ",
      });
      return;
    }

    try {
      await prismaInstance.sourcecodes.create({
        data: {
          ...req.body,
        },
      });

      res.status(200).json({
        msg: "Operation successful",
      });
    } catch (err: any) {
      res.status(500).json({
        msg: "Internal error occurred !",
      });
    } finally {
      prismaInstance.$disconnect();
    }
  }

  // to get all codes
  static async getCodes(req: Request, res: Response) {
    let submissions: codeModel[] = []
    try {
      submissions = await prismaInstance.sourcecodes.findMany();
      console.log(res);


      // let  = res;
      res.status(200).json(submissions)
  
    } catch (err: any) {
      console.log(err)
      res.status(500).json({msg: "internal error"})
    } finally {
      prismaInstance.$disconnect();
      // res.status(200).json(submissions)
    }
  }
}
