import { modifyString } from '../src/index';

describe('modifyString Function', () => {
    test('toSlug operation', () => {
        expect(modifyString({ str: "Hello World!", operation: 'toSlug' })).toBe("hello-world");
        expect(modifyString({ str: "This_is_a_test", operation: 'toSlug' })).toBe("this-is-a-test");
    });

    test('capitalizeFirstWord operation', () => {
        expect(modifyString({ str: " hello world", operation: 'capitalizeFirstWord' })).toBe("Hello world");
        expect(modifyString({ str: "hello", operation: 'capitalizeFirstWord' })).toBe("Hello");
    });

    test('capitalizeWords operation', () => {
        expect(modifyString({ str: "hello world", operation: 'capitalizeWords' })).toBe("Hello World");
        expect(modifyString({ str: "hello world multiple words here", operation: 'capitalizeWords' })).toBe("Hello World Multiple Words Here");
    });

    test('camelCase operation', () => {
        expect(modifyString({ str: "hello world", operation: 'camelCase' })).toBe("helloWorld");
        expect(modifyString({ str: "hello world this is a test", operation: 'camelCase' })).toBe("helloWorldThisIsATest");
    });

    test('countWords operation', () => {
        expect(modifyString({ str: "hello world", operation: 'countWords' })).toBe(2);
        expect(modifyString({ str: "  hello   world  ", operation: 'countWords' })).toBe(2);
    });

    test('removeNumbers operation', () => {
        expect(modifyString({ str: "hello123@world456", operation: 'removeNumbers' })).toBe("hello@world");
        expect(modifyString({ str: "no numbers", operation: 'removeNumbers' })).toBe("no numbers");
    });

    test('onlyLetters operation', () => {
        expect(modifyString({ str: "hello123!@# world456", operation: 'onlyLetters' })).toBe("hello world");
        expect(modifyString({ str: "hello123 world!", operation: 'onlyLetters' })).toBe("hello world");
    });

    test('removeExtraSpaces operation', () => {
        expect(modifyString({ str: "  hello   world  ", operation: 'removeExtraSpaces' })).toBe("hello world");
        expect(modifyString({ str: "hello   world", operation: 'removeExtraSpaces' })).toBe("hello world");
    });

    test('dotCase operation', () => {
        expect(modifyString({ str: "Hello World", operation: 'dotCase' })).toBe("hello.world");
        expect(modifyString({ str: "This is a test", operation: 'dotCase' })).toBe("this.is.a.test");
    });

    test('removeWords operation', () => {
        expect(modifyString({ str: "hello my world", operation: 'removeWords', blacklist: ["Hello"], caseSensitive: true })).toBe("hello my world");
        expect(modifyString({ str: "hello my world today!", operation: 'removeWords', blacklist: ["Hello", "my", "today!"], caseSensitive: false })).toBe("world");
        expect(modifyString({ str: "hello x my world today 1 !", operation: 'removeWords', blacklist: ["Hello", "my", "x", "1", "!"], caseSensitive: false })).toBe("world today");
    });

    test('throws error for invalid operation', () => {
        expect(() => modifyString({ str: "hello world", operation: 'invalidOperation' as any })).toThrow('Invalid operation');
    });

    test('throws error if blacklist is missing for removeWords', () => {
        expect(() => modifyString({ str: "hello world", operation: 'removeWords' })).toThrow('Blacklist is required for removeWords operation');
    });

    test('throws error if input is not a string', () => {
        expect(() => modifyString({ str: 123 as any, operation: 'toSlug' })).toThrow('Input must be a string');
    });
});

