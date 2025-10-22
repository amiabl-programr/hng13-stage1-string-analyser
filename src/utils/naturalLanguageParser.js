
export function parseNaturalLanguageQuery(query) {
  if (!query || typeof query !== "string") {
    throw new Error("Query must be a non-empty string");
  }

  const lower = query.toLowerCase();
  const filters = {};



  // 1️⃣ Palindromic
  if (lower.includes("palindromic")) {
    filters.is_palindrome = true;
  }

  // 2️⃣ Word count: single word / two word / etc
  const wordCountMap = {
    "single word": 1,
    "one word": 1,
    "two words": 2,
    "three words": 3,
  };
  for (const [phrase, count] of Object.entries(wordCountMap)) {
    if (lower.includes(phrase)) {
      filters.word_count = count;
    }
  }

  // 3️⃣ Length: "longer than X characters", "shorter than X"
  const longerMatch = lower.match(/longer than (\d+) characters?/);
  if (longerMatch) {
    filters.min_length = parseInt(longerMatch[1], 10) + 1;
  }

  const shorterMatch = lower.match(/shorter than (\d+) characters?/);
  if (shorterMatch) {
    filters.max_length = parseInt(shorterMatch[1], 10) - 1;
  }

  // 4️⃣ Contains: "containing the letter a", "contain z", etc
  const containsMatch = lower.match(/contain(?:ing)? (?:the letter )?([a-z])/);
  if (containsMatch) {
    filters.contains_character = containsMatch[1];
  }

  // 5️⃣ Heuristic: "first vowel" → a
  if (lower.includes("first vowel")) {
    filters.contains_character = "a";
  }

  // If no filters were found, throw error
  if (Object.keys(filters).length === 0) {
    throw new Error("Unable to parse natural language query");
  }

  return filters;
}
