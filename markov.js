/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.chain = {}
    this.newText = ""
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    for (let i = 0; i < this.words.length; i++) {
      if (this.words[i] in this.chain && i < this.words.length) {
        // this word is already in chain, so we have to add it to the end of its array
        this.chain[this.words[i]].push(this.words[i + 1])
      } else if (i < this.words.length) {
        // make new array
        // console.log('i is ', i, ' length is ', this.words.length)
        this.chain[this.words[i]] = [this.words[i + 1]]
      }

    }
    // console.log(this.chain)
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    // randomly start with a word
    let startingWord = this.words[Math.floor(Math.random() * this.words.length - 1)]
    let latestWord = startingWord
    // console.log(Math.floor(Math.random() * this.words.length - 1))
    // console.log('first word is ', startingWord)
    this.newText = startingWord
    // console.log('text is first', this.newText)
    for (let i = 0; i < numWords; i++) {
      // 
      // find the latest word from this.chain and randomly pick a word
      // console.log('array for the latest word is', this.chain[latestWord])
      // console.log('length of latest word array -1', this.chain[latestWord].length - 1)
      // console.log('we are choosing this array index is it always 0?', Math.round(Math.random() * (this.chain[latestWord].length - 1)))
      latestWord = this.chain[latestWord][Math.round(Math.random() * (this.chain[latestWord].length - 1))]
      // console.log('word to add is', latestWord)
      if (latestWord) {
        this.newText += ' ' + latestWord
      } else {
        latestWord = startingWord
        this.newText += ' ' + startingWord
      }
    }
    console.log(this.newText)
  }
}


// let mm = new MarkovMachine(`Do you like
// Green eggs and ham

// I do not like them,
// Sam-I-am.
// I do not like
// Green eggs and ham.

// Would you like them
// Here or there?

// I would not like them
// Here or there.
// I would not like them
// Anywhere.
// I do not like
// Green eggs and ham.
// I do not like them,
// Sam-I-am`);
// mm.makeText()

module.exports = MarkovMachine