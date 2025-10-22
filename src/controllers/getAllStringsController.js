import { getAllStrings } from "../db/memoryDB.js";

function getAllStringsController(req, res) {
  try {
    const {
      is_palindrome,
      min_length,
      max_length,
      word_count,
      contains_character,
    } = req.query;

    // Parse and validate query params
    const filters = {};

    if (is_palindrome !== undefined) {
      if (is_palindrome !== "true" && is_palindrome !== "false") {
        return res.status(400).json({
          status: "error",
          message: "Invalid value for is_palindrome. Must be true or false.",
        });
      }
      filters.is_palindrome = is_palindrome === "true";
    }

    if (min_length !== undefined) {
      const num = parseInt(min_length, 10);
      if (isNaN(num) || num < 0) {
        return res.status(400).json({
          status: "error",
          message: "min_length must be a non-negative integer.",
        });
      }
      filters.min_length = num;
    }

    if (max_length !== undefined) {
      const num = parseInt(max_length, 10);
      if (isNaN(num) || num < 0) {
        return res.status(400).json({
          status: "error",
          message: "max_length must be a non-negative integer.",
        });
      }
      filters.max_length = num;
    }

    if (word_count !== undefined) {
      const num = parseInt(word_count, 10);
      if (isNaN(num) || num < 0) {
        return res.status(400).json({
          status: "error",
          message: "word_count must be a non-negative integer.",
        });
      }
      filters.word_count = num;
    }

    if (contains_character !== undefined) {
      if (typeof contains_character !== "string" || contains_character.length !== 1) {
        return res.status(400).json({
          status: "error",
          message: "contains_character must be a single character string.",
        });
      }
      filters.contains_character = contains_character;
    }

    // Fetch all strings from memory DB
    let data = getAllStrings();

    // Apply filters
    data = data.filter((item) => {
      const p = item.properties;

      if (filters.is_palindrome !== undefined && p.is_palindrome !== filters.is_palindrome) {
        return false;
      }

      if (filters.min_length !== undefined && p.length < filters.min_length) {
        return false;
      }

      if (filters.max_length !== undefined && p.length > filters.max_length) {
        return false;
      }

      if (filters.word_count !== undefined && p.word_count !== filters.word_count) {
        return false;
      }

      if (filters.contains_character !== undefined && !item.value.includes(filters.contains_character)) {
        return false;
      }

      return true;
    });
console.log("Filters applied:", filters);
console.log("Filtered data count:", data);
    return res.status(200).json({
      data,
      count: data.length,
      filters_applied: filters,
    });
  } catch (error) {
    console.error("Error in getAllStringsController:", error);
    return res.status(500).json({
      status: "error",
      message: "An unexpected error occurred.",
    });
  }
}

export default getAllStringsController;
