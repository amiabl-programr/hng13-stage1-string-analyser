import crypto from "crypto";
import { getString } from "../db/memoryDB.js";

function getSpecificStringController(req, res) {
  const { string_value } = req.params;

  if (!string_value) {
    return res.status(400).json({
      status: "error",
      message: "No string value provided in the request URL.",
    });
  }

  // Create the same hash used when storing
  const sha256_hash_value = crypto
    .createHash("sha256")
    .update(string_value)
    .digest("hex");

  const data = getString(sha256_hash_value);

  if (!data) {
    return res.status(404).json({
      status: "error",
      message: "String does not exist in the system.",
    });
  }

  // Found
  return res.status(200).json(data);
}


export default getSpecificStringController;