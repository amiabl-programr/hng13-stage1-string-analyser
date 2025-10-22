import crypto from 'crypto'

function submitStringsController(req, res) {
    // Controller logic to handle string submission
    const { value } = req.body;
    // check if the string is provided
    if (!value) {
        return res.status(400).json({
            status: "error",
            message: "No string provided in the request body."
        });
    }

    // check if an actual string is sent
    if (typeof value !== 'string') {
        return res.status(422).json({
            status: "error",
            message: "The provided input is not a valid string."
        });
    }

    console.log(`Received string: ${value}`);
    // functions
    const  getWordCount = (words_to_count) => {
       return words_to_count.split(' ').filter(function(n) {return n !== ''}).length;
    }
    const getShaHash = (string_to_hash) => {
        return crypto.createHash('sha256').update(string_to_hash).digest('hex');
    }
    const getCharacterFrequencyMap = (string_to_count) => {
            const freqMap = {};

            for (const char of string_to_count){
                if(char === ' ') continue;

                freqMap[char] = (freqMap[char] || 0) + 1;
            }
            return freqMap;
    }

    // check length of the string
    const string_length = value.length;
    const is_palindrome = value === value.split('').reverse().join('');
    const unique_characters = Array.from(new Set(value)).length;
    const sha256_hash_value = getShaHash(value);
    const word_count = getWordCount(value);
    const character_frequency_map = getCharacterFrequencyMap(value);

    console .log({
         "id": sha256_hash_value,
        "value": value,
        "properties": {
            "length": string_length,
            "is_palindrome": is_palindrome,
            "unique_characters": unique_characters,
            "word_count": word_count,
            "sha256_hash": sha256_hash_value,
            "character_frequency_map": character_frequency_map
        },
        "created_at": Date.UTC
    })

    
    res.status(201).json({
        "id": sha256_hash_value,
        "value": value,
        "properties": {
            "length": string_length,
            "is_palindrome": is_palindrome,
            "unique_characters": unique_characters,
            "word_count": word_count,
            "sha256_hash": sha256_hash_value,
            "character_frequency_map": character_frequency_map
        },
        "created_at": Date.UTC
    })


}
export default submitStringsController;