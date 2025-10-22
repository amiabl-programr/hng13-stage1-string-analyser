import crypto from "crypto";
import { getString } from "../db/memoryDB.js";
import { normalizeString } from "../utils/normalise.js";

function getSpecificStringController(req, res) {
  const { id } = req.params;

  if (typeof id !== "string" || id.trim() === "") {
    return res.status(400).json({
      status: "error",
      message: "No string value provided in the request URL.",
    });
  }

  const normalized = normalizeString(id);
  const sha256_hash_value = crypto.createHash("sha256").update(normalized).digest("hex");

  const data = getString(sha256_hash_value);

  if (!data) {
    return res.status(404).json({
      status: "error",
      message: "String does not exist in the system.",
    });
  }

  return res.status(200).json(data);
}

export default getSpecificStringController;
