// Converts a string to a URL-friendly slug by replacing spaces and underscores with hyphens and removing non-alphanumeric characters except hyphens.
const toSlug = (str: string): string => {
    return str
        .toLowerCase()
        .trim()
        .replace(/[\s_]+/g, '-') // Replace spaces and underscores with hyphens
        .replace(/[^\w-]+/g, ''); // Remove non-alphanumeric characters except hyphens
};

// Capitalizes the first character of the string after trimming any leading or trailing spaces.
const capitalizeFirstWord = (str: string): string => {
    return str
        .trim()
        .replace(/^\w/, (c) => c.toUpperCase()); // Capitalize the first character
};

// Capitalizes the first character of each word in the string after trimming spaces.
const capitalizeWords = (str: string): string => {
    return str
        .trim()
        .replace(/\b\w/g, (c) => c.toUpperCase()); // Capitalize the first character of each word
};

// Converts a string to camelCase by removing spaces and capitalizing the first letter of each word except the first word.
const camelCase = (str: string): string => {
    return str
        .toLowerCase()
        .trim()
        .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
            index === 0 ? match.toLowerCase() : match.toUpperCase()
        )
        .replace(/\s+/g, ''); // Remove spaces
};

// Counts the number of words in a string by splitting it on spaces and filtering out empty entries.
const countWords = (str: string): number => {
    return str
        .trim()
        .split(/\s+/).filter(Boolean).length; // Split by spaces and count non-empty words
};

// Removes all numeric characters from the string.
const removeNumbers = (str: string): string => {
    return str.replace(/\d+/g, ''); // Remove all digits
};

// Removes all non-letter characters from the string, except spaces.
const onlyLetters = (str: string): string => {
    return str.replace(/[^a-zA-Z\s]/g, ''); // Remove non-letter characters except spaces
};

// Removes extra spaces from the string, leaving only single spaces between words.
const removeExtraSpaces = (str: string): string => {
    return str
        .trim()
        .replace(/\s+/g, ' '); // Replace multiple spaces with a single space
};

// Converts a string to dot.case by replacing spaces with dots and converting to lowercase.
const dotCase = (str: string): string => {
    return str
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '.'); // Replace spaces with dots
};

const removeWords = (str: string, blacklist: string[], caseSensitive?: boolean): string => {
    if (caseSensitive === undefined) {
        caseSensitive = false; // Default to false if not provided
    }
    return blacklist.reduce((acc, word) => {
        const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape special characters in the word
        const regex = new RegExp(`\\s*${escapedWord}\\s*`, `g${caseSensitive ? '' : 'i'}`); // Match the word with optional spaces around it
        return acc.replace(regex, ' ').trim(); // Replace with a single space and trim the result
    }, str).replace(/\s+/g, ' '); // Ensure no extra spaces remain
};


type ModifyString = {
    str: string,
    operation: 'toSlug' |
    'capitalizeFirstWord' |
    'capitalizeWords' |
    'camelCase' |
    'countWords' |
    'removeNumbers' |
    'onlyLetters' |
    'removeExtraSpaces' |
    'dotCase' |
    'removeWords',
    blacklist?: string[],
    caseSensitive?: boolean

}

/**
 * 
 * Modifies a string based on the specified operation.
 * 
 * @param {string} str - The input string to be modified.
 * @param {string} operation - The operation to perform on the string.
 * @param {string[]} [blacklist] - An array of words to remove (required for removeWords operation).
 * @param {boolean} [caseSensitive=false] - Whether the removal of words should be case-sensitive (only for removeWords operation).
 * 
 * @returns {string | number} - The modified string or the word count, depending on the operation.
 * 
 * @throws {Error} - Throws an error if the input is not a string, if the operation is invalid, or if blacklist is required but not provided.
 * 
 * @description
 * Supported operations:
 * - toSlug: Converts the string to a URL-friendly slug.
 * - capitalizeFirstWord: Capitalizes the first word of the string.
 * - capitalizeWords: Capitalizes the first letter of each word in the string.
 * - camelCase: Converts the string to camelCase format.
 * - countWords: Counts the number of words in the string.
 * - removeNumbers: Removes all numeric characters from the string.
 * - onlyLetters: Removes all non-letter characters from the string, except spaces.
 * - removeExtraSpaces: Removes extra spaces, leaving only single spaces between words.
 * - dotCase: Converts the string to dot.case format.
 * - removeWords: Removes specified words from the string. Requires a blacklist array and an optional caseSensitive boolean (default is false).
 * 
 * @example
 * modifyString({ str: "Hello World!", operation: "toSlug" }); // "hello-world"
 * modifyString({ str: "hello world", operation: "capitalizeFirstWord" }); // "Hello world"
 * modifyString({ str: "hello world", operation: "capitalizeWords" }); // "Hello World"
 * modifyString({ str: "hello world", operation: "camelCase" }); // "helloWorld"
 * modifyString({ str: "hello world", operation: "countWords" }); // 2
 * modifyString({ str: "hello123 world456", operation: "removeNumbers" }); // "hello world"
 * modifyString({ str: "hello! world#", operation: "onlyLetters" }); // "hello world"
 * modifyString({ str: "hello    world", operation: "removeExtraSpaces" }); // "hello world"
 * modifyString({ str: "hello world", operation: "dotCase" }); // "hello.world"
 * modifyString({ str: "This is a test", operation: "removeWords", blacklist: ["is", "a"] }); // "This test" 
 * 
 * @link https://github.com/PatrickNassar0/string-playground
 */

const modifyString = ({ str, operation, blacklist, caseSensitive }: ModifyString): string | number => {
    if (typeof str !== 'string') {
        throw new Error('Input must be a string');
    }
    switch (operation) {
        case 'toSlug':
            return toSlug(str);
        case 'capitalizeFirstWord':
            return capitalizeFirstWord(str);
        case 'capitalizeWords':
            return capitalizeWords(str);
        case 'camelCase':
            return camelCase(str);
        case 'countWords':
            return countWords(str);
        case 'removeNumbers':
            return removeNumbers(str);
        case 'onlyLetters':
            return onlyLetters(str);
        case 'removeExtraSpaces':
            return removeExtraSpaces(str);
        case 'dotCase':
            return dotCase(str);
        case 'removeWords':
            if (!blacklist) {
                throw new Error('Blacklist is required for removeWords operation');
            }
            return removeWords(str, blacklist, caseSensitive);
        default:
            throw new Error('Invalid operation');
    }

}

export default modifyString;
