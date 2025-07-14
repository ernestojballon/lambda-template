import { fromIni } from "@aws-sdk/credential-providers";
import { defaultProvider } from "@aws-sdk/credential-provider-node";

let credentialsProvider;

if (process.env.ENVIRONMENT === "development") {
  // Use shared credentials file for development
  credentialsProvider = fromIni({ profile: "default" });
} else {
  // Use default credential provider chain for non-development environments
  credentialsProvider = defaultProvider();
}

export const getCredentials = async () => {
  return await credentialsProvider();
};

export const getRegion = () => {
  return process.env.AWS_REGION || "us-east-1";
};
