const natural = require('natural');

function processText(text) {
    if (!text) return [];

    // Using a RegexpTokenizer to optionally preserve symbols like +, ., - (e.g., C++, Node.js)
    const tokenizer = new natural.RegexpTokenizer({ pattern: /[^a-zA-Z0-9+#.-]+/ });
    return tokenizer.tokenize(text.toLowerCase());
}

module.exports = processText;