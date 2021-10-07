/*
Random ID Electron Version
Author: Axel Rothe (c) 2021 All Rights Reserved
 */

const CryptoJS = require("crypto-js");

/**
 * RandomID - The randomized and 100% collision free ID Generator
 * Version: Electron - Bzzzzt
 */
class RandomID {
    /**
     * Create a new RandomID instance
     * @param key {String} (optional) Setting a Key creates a unique instance of RandomID, that you can use to generate unique sets
     */
    constructor(key = "randomidkey") {
        /* build seed from timestamp and a random string - this ensures that each time RandomID is instanced it creates a pseudo unique seed and can't accidentally override each other */
        this.seed = (Date.now() + this.randomString(12)).toString();
        /* the counter is used to keep track of how often this instance was called */
        this.counter = 0;
        /* Key is used to create unique RandomID instances */
        this.key = key;

        // scriptLoader.load("/crypto-js/crypto-js.js");
    }

    /**
     * Generates a system unique ID
     *
     * @return {String} the ID
     */
    generate() {
        /* Tick up counter */
        this.counter++;
        /* We enforce compression of data to a uniform output with AES
         *  The key we use is irrelevant, but it needs to be permanent
         */
        let cryptoHash = CryptoJS.AES.encrypt(this.seed + this.counter, this.key);
        return btoa(cryptoHash.toString()).replaceAll("/", "x").replaceAll("+", "y");
    }

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
