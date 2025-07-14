import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  GetCommand,
  PutCommand,
  DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";
import { getCredentials, getRegion } from "./getCredentials.js";

const client = new DynamoDBClient({
  credentials: getCredentials(),
  region: getRegion(),
});
const docClient = DynamoDBDocumentClient.from(client);

export const saveItem = async ({ tableName, item }) => {
  try {
    console.log({
      item,
    });
    const command = new PutCommand({
      TableName: tableName,
      Item: item,
    });
    await docClient.send(command);
    console.log("Item saved successfully");
  } catch (error) {
    console.error("Error saving item:", error);
    throw error;
  }
};

export const getItem = async ({ tableName, key, partitionKeyName = "id" }) => {
  try {
    const command = new GetCommand({
      TableName: tableName,
      Key: {
        [partitionKeyName]: key,
      },
    });

    const response = await docClient.send(command);
    return response.Item;
  } catch (error) {
    console.error("Error getting item:", error);
    throw error;
  }
};
