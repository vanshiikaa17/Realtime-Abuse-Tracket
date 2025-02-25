const fs = require('fs');

// Load words from file
function loadWordsFromFile(filePath) {
    return fs.readFileSync(filePath, 'utf-8')
        .split('\n')  // Split words by line
        .map(word => word.trim()) // Remove extra spaces
        .filter(word => word.length > 0); // Remove empty lines
}


module.exports=loadWordsFromFile;
// console.log(trie.search("shit")); // Check if "hello" is in the trie
// console.log(trie.startsWith("he")); // Find words starting with "he"
