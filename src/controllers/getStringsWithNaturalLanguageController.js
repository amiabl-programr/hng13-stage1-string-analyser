import { parseNaturalLanguageQuery } from "../utils/naturalLanguageParser.js";
import { getAllStrings } from "../db/memoryDB.js";

function getStringsWithNaturalLanguageController(req, res) {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        status: "error",
        message: "Missing 'query' parameter in URL.",
      });
    }

    let parsedFilters;
    try {
      parsedFilters = parseNaturalLanguageQuery(query);
    } catch (err) {
      return res.status(400).json({
        status: "error",
        message: "Unable to parse natural language query.",
      });
    }

    //  detect conflicting filters (e.g. min_length > max_length)
    if (
      parsedFilters.min_length &&
      parsedFilters.max_length &&
      parsedFilters.min_length > parsedFilters.max_length
    ) {
      return res.status(422).json({
        status: "error",
        message: "Query parsed but resulted in conflicting filters.",
      });
    }

   
    let data = getAllStrings();

    // Apply the  filtering logic 
    data = data.filter((item) => {
      const p = item.properties;

      if (parsedFilters.is_palindrome !== undefined && p.is_palindrome !== parsedFilters.is_palindrome) {
        return false;
      }

      if (parsedFilters.min_length !== undefined && p.length < parsedFilters.min_length) {
        return false;
      }

      if (parsedFilters.max_length !== undefined && p.length > parsedFilters.max_length) {
        return false;
      }

      if (parsedFilters.word_count !== undefined && p.word_count !== parsedFilters.word_count) {
        return false;
      }

      if (parsedFilters.contains_character !== undefined && !item.value.includes(parsedFilters.contains_character)) {
        return false;
      }

      return true;
    });

    return res.status(200).json({
      data,
      count: data.length,
      interpreted_query: {
        original: query,
        parsed_filters: parsedFilters,
      },
    });
  } catch (error) {
    console.error("Error in getStringsWithNaturalLanguageController:", error);
    return res.status(500).json({
      status: "error",
      message: "An unexpected error occurred.",
    });
  }
}

export default getStringsWithNaturalLanguageController;
