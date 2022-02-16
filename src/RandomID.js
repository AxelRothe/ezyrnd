/*
Random ID Electron Version
Author: Axel Rothe (c) 2021 All Rights Reserved
 */

const { XXHash64, XXHash32, XXHash3, XXHash128 } = require("xxhash-addon");
const {StringDecoder} = require("string_decoder");

/**
 * RandomID - The randomized and 100% collision free ID Generator
 */
class RandomID {
    static key = 12345678;
    static hashStyle = "xxhash128";

    /**
     * Create a new RandomID instance
     * @param key {String} (optional) Setting a Key creates a unique instance of RandomID, that you can use to generate unique sets
     */
    constructor() {
        /* build seed from timestamp and a random string - this ensures that each time RandomID is instanced it creates a pseudo unique seed and can't accidentally override each other */
        this.seed = (Date.now() + this.randomString(12)).toString();
        /* the counter is used to keep track of how often this instance was called */
        this.counter = 0;
    }

    /**
     * Hashes a File or retrieves it's hash from the Indexer
     *
     * @param {string?} hashStyle xxhash3, xxhash32, xxhash63, xxhash128 default: xxhash128
     * @returns {String} returns the hash or a falsey value if the file is unavailable
     */
    generate(hashStyle = RandomID.hashStyle) {
        this.counter++
        return this.buildHash(Date.now()+this.seed+this.counter,"xxhash128");
    }

    buildHash(string, hashStyle = RandomID.hashStyle){
	    let hash;

	    switch (hashStyle) {
		    case "xxhash128":
			    hash = new XXHash128(RandomID.key);
			    break;
		    case "xxhash64":
			    hash = new XXHash64(RandomID.key);
			    break;
		    case "xxhash32":
			    hash = new XXHash32(RandomID.key);
			    break;
		    case "xxhash3":
			    hash = new XXHash3(RandomID.key);
			    break;
		    default:
			    hash = new XXHash64(RandomID.key);
	    }

	    hash.update(Buffer.from(string));
	    let digest = hash.digest();
	    const decoder = new StringDecoder("base64");
	    return decoder.write(digest);
    }

    /**
     * Generates a random string of a desired length
     *
     * @param {number} length the number of chars to be generated
     * @return {string} string of x length possible characters a-z,A-Z,0-9
     */
    randomString(length) {
        const chars = [
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "a",
            "b",
            "c",
            "d",
            "e",
            "f",
            "g",
            "h",
            "i",
            "j",
            "k",
            "l",
            "m",
            "n",
            "o",
            "p",
            "q",
            "r",
            "s",
            "t",
            "u",
            "v",
            "w",
            "x",
            "y",
            "z",
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G",
            "H",
            "I",
            "J",
            "K",
            "L",
            "M",
            "N",
            "O",
            "P",
            "Q",
            "R",
            "S",
            "T",
            "U",
            "V",
            "W",
            "X",
            "Y",
            "Z",
        ];
        let randomString = "";
        for (let i = 0; i < length; i++) {
            randomString += chars[Math.floor(Math.random() * chars.length)];
        }
        return randomString;
    }
}

/*
Export to use as a module, it will export as a Singleton
 */
exports.RandomID = new RandomID();
exports.RandomIDConstructor = RandomID;
