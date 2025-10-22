import crypto from "crypto";
import { addString, getString } from "../db/memoryDB.js"; // import getString too

function submitStringsController(req, res) {
  const { value } = req.body;

  // Validate input
  if (!value) {
    return res.status(400).json({
      status: "error",
      message: "No string provided in the request body.",
    });
  }

  if (typeof value !== "string") {
    return res.status(422).json({
      status: "error",
      message: "The provided input is not a valid string.",
    });
  }

  // Helper functions
  const getWordCount = (str) =>
    str.split(" ").filter((n) => n !== "").length;

  const getShaHash = (str) =>
    crypto.createHash("sha256").update(str).digest("hex");

  const getCharacterFrequencyMap = (str) => {
    const freqMap = {};
    for (const char of str) {
      if (char === " ") continue;
      freqMap[char] = (freqMap[char] || 0) + 1;
    }
    return freqMap;
  };

  // Compute hash to use as ID
  const sha256_hash_value = getShaHash(value);

  // ✅ Check if the string already exists
  const existing = getString(sha256_hash_value);
  if (existing) {
    return res.status(409).json({
      status: "error",
      message: "This string has already been submitted."
    });
  }

  // Compute properties
  const data = {
    id: sha256_hash_value,
    value,
    properties: {
      length: value.length,
      is_palindrome: value === value.split("").reverse().join(""),
      unique_characters: new Set(value).size,
      word_count: getWordCount(value),
      sha256_hash: sha256_hash_value,
      character_frequency_map: getCharacterFrequencyMap(value),
    },
    created_at: new Date().toISOString(),
  };

  // Store in DB
  addString(sha256_hash_value, data);

  console.log("Stored:", data);

  res.status(201).json(data);
}

export default submitStringsController;
