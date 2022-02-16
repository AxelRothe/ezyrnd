# ezyrnd

## install

```
const { ezyrnd, eyzrndConstructor } = require('ezyrnd');


## Generate unqiue id

Choose the hashing algorithm. Think: the higher the bits the more unlikely a collision will be

```
ezyrnd.generate('xxhash128') //default: xxhash128
```

## Generate random string

Simple utility if you need to add a random string. Will generate a string of a desired length, using only a-z,A-Z,0-9

```
ezyrnd.randomString(12)
//output: a2zdDbcz123s
