import express from "express";
import { asyncHandler } from "../utils/asyncHandler.js";

// create a validation middleware that either checks the recaptchaChecker or jwtCheck
// requirement is that just one of them should be checked

const router = express.Router();

router.get(
  "/test",
  asyncHandler(async (req, res) => {
    return res.json({ status: "ok" });
  }),
);

export default router;