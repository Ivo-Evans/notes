async and await are two keywords that work in tandem. async precedes the word function

  async function myFunction() {

  }

await precedes things inside an async function

    async function myFunction() {
      let something = await fetch('https://api.tronalddump.io/random/quote')
      something = await something.json();
      console.log(something.value)
    }

Basically it works like this. await lets you create a blocking effect _within_ a function. async means that the function, when called, will be handled asynchronously:

  myFunction()
  console.log('pineapples')

This logs 'pineapples' while we are fetching content from the API, then logs the quote the API gave us.