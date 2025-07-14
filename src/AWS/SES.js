import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { getCredentials, getRegion } from "./getCredentials.js";
import { logEvent } from "../utils/logger.js";

const sesClient = new SESClient({
  credentials: getCredentials(),
  region: getRegion(),
});

const sendEmail = async (params) => {
  logEvent({
    event: "INFO",
    payload: {
      message: "sending email",
    },
  });

  const command = new SendEmailCommand(params);
  try {
    const response = await sesClient.send(command);
    logEvent({
      event: "EMAIL-SUCCESS",
      payload: {
        success: true,
        response,
      },
    });
    return response;
  } catch (error) {
    logEvent({
      event: "ERROR",
      payload: {
        message: `Error sending email`,
        error,
      },
    });
    throw error;
  }
};

export default sendEmail;
