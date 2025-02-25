class TrieNode {
    constructor() {
        this.children = {}; // Store child nodes
        this.isEndOfWord = false; // Mark if the word ends here
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    // Insert a word into the Trie
    insert(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
    }

    // Search for an exact word
    search(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) {
                return false; // Word not found
            }
            node = node.children[char];
        }
        return node.isEndOfWord;
    }

    // Find words with a given prefix
    startsWith(prefix) {
        let node = this.root;
        for (let char of prefix) {
            if (!node.children[char]) {
                return []; // No words with this prefix
            }
            node = node.children[char];
        }
        return this._collectWords(node, prefix);
    }

    // Helper function to collect words from a given node
    _collectWords(node, prefix) {
        let results = [];
        if (node.isEndOfWord) results.push(prefix);

        for (let char in node.children) {
            results = results.concat(this._collectWords(node.children[char], prefix + char));
        }

        return results;
    }
}
module.exports= Trie;