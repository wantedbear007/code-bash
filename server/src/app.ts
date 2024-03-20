import { PrismaClient } from "@prisma/client";

// user defined
import Routes from "./routes";

export const prismaInstance: PrismaClient = new PrismaClient();

async function startServices(): Promise<void> {
  try {
    await prismaInstance.$connect();
    // await prismaInstance.sourcecodes.create({
    //   data: {
    //     username: 'user1',
    //     language: 'Python',
    //     sourceCode: 'print("Hello, World!")',
    //     stdin: 'input for program 1',
    //     stdout: 'output for program 1',
    //   },
    // });
    
    // await prismaInstance.sourcecodes.create({
    //   data: {
    //     username: 'user2',
    //     language: 'JavaScript',
    //     sourceCode: 'console.log("Hello, World!")',
    //     stdin: 'input for program 2',
    //     stdout: 'output for program 2',
    //   },
    // });
    
    // Add more entries as needed...
    

  } catch (err: any) {
    console.log("error occurred \n", err);
    process.exit(1);
  } finally {
    console.log("database is connected !");
    Routes.startServices();
    prismaInstance.$disconnect();
  }
}

startServices();
