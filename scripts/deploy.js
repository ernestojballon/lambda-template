import "dotenv/config";
import {
  LambdaClient,
  UpdateFunctionCodeCommand,
} from "@aws-sdk/client-lambda";
import fs from "fs/promises";
import AdmZip from "adm-zip";


// Edit these values with the values from your function
const functionName = process.env.FUNCTION_NAME;
const awsRegion = "us-east-1";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;


// Create a Lambda client
const lambdaClient = new LambdaClient({
  region: awsRegion,
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
  },
});

const zipCurrentDirectory = async (sourceDir, outputFilePath) => {
  const zip = new AdmZip();
  zip.addLocalFolder(sourceDir);
  await zip.writeZipPromise(outputFilePath);
  console.log(`Zip file created: ${outputFilePath}`);
};

// Function to update Lambda function code
const updateLambdaFunction = async (zipFilePath) => {
  const zipFileContents = await fs.readFile(zipFilePath);

  const command = new UpdateFunctionCodeCommand({
    FunctionName: functionName,
    ZipFile: zipFileContents,
  });

  try {
    const data = await lambdaClient.send(command);
    console.log("Success", data);
  } catch (err) {
    console.error("Error", err);
  }
};

const deleteFile = async (file) => {
  try {
    await fs.unlink(file);
    console.log(`File ${file} deleted successfully`);
  } catch (err) {
    console.error(`Error deleting file ${file}:`, err);
  }
};

const zipFilePath = "server.zip"; // The desired output ZIP file path

const main = async () => {
  try {
    await zipCurrentDirectory(".", zipFilePath);
    console.log("Project zipped successfully.");

    await updateLambdaFunction(zipFilePath);

    await deleteFile(zipFilePath);
  } catch (err) {
    console.error("Error:", err);
  }
};

main();
