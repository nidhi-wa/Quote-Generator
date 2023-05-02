const quoteGenerator = document.getElementById("quote-generator");
const quoteText = document.getElementById("txt");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");





let apiQuotes = [];

 function loading() {
    loader.hidden = false;
    quoteGenerator.hidden= true;
}

function complete() {
    loader.hidden = true;
    quoteGenerator.hidden= false;
}


function newQuote() {
    // Pick a randaom quote from apiQuotes array
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // check if author feild is blank and replace it with 'unknown'
    if (!quote.author){
        authorText.textContent = 'Unknown author';

    }else {
        authorText.textContent=quote.author;
    }
    // check quote length to determine styling
    if(quote.text.length > 100) {
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    complete();
    quoteText.textContent=quote.text;
}

// get quote from api
async function getQuotes(){
    
    loading();
    const apiUrl="https://type.fit/api/quotes";
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote(apiQuotes);
    } catch(error) {
        // catch the error
    }
}
// tweet quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/compose/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// event listner
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);


getQuotes();