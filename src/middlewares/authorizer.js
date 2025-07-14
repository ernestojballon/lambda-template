import { auth } from "express-oauth2-jwt-bearer";

// only request token on environment different than development
export const jwtCheck =
  process.env.ENVIRONMENT === "development"
    ? (req, res, next) => next()
    : auth({
      audience: process.env.AUTH0_AUDIENCE,
      issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
      tokenSigningAlg: process.env.AUTH0_TOKEN_SIGNING_ALG,
    });



// this is an Auth0 middleware that checks if the request is authenticated
// you authentication token has to be in the header of the request
