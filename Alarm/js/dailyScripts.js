function getFact(){
    onload = fetch("./daily_items/facts.json").then(res=>{
        return res.json();
    }).then(data=>{
        data = data['facts']
        let rando = Math.round(Math.random() *data.length);
        for (let i = 0; i < data.length;i++){
            //console.log(data[i]);
        }
        document.getElementById("fact").innerHTML = "Daily Fact:<br>"+data[rando];
    });
}

function getQuote(){
    fetch("./daily_items/quotes.json").then(res=>{
        return res.json();
    }).then(data=>{
        //console.log(data)
        let rando = Math.round(Math.random() *data.length);
        for (let i = 0; i < data.length;i++){
            //console.log(data);
        }
        document.getElementById("quote").innerHTML = "Daily Quote:<br>"+data[rando]['text']+'<br>-'+data[rando]['from'];
    });
}

function getVocab(){
    fetch("./daily_items/vocab.txt").then(res=>{
        return res.text();
    }).then(data=>{
        data = data.split("\n")
        //console.log(data)
        console.log(data.length)
        let rando = Math.round(Math.random() *data.length);
        console.log(rando+data[rando])
        let word = data[rando].split("\"")[1]
        document.getElementById("vocab").innerHTML = "Daily Vocab:<br>"+word+". <br>Look it up";

        //find way to scrape dictonary and get definition

        // const apiUrl = "https://www.wordnik.com/words/";

        // let url = apiUrl+word
        // fetch(url).then(function(response) {
        //     return response.text();
        //   }).then(function(data) {
        //     console.log(data);
        //   });
    });
}

//will suggest a 'challenge' to complete for the day
function getChallenge(){
    let challenges = ['run 1+ mile', 'bike 3+ miles', 'meditate 10+ mins', 'read 20+ pages', 'use phone < 1 hour', 'draw a taken photo',
         'learn new song from piano book', 'take photos at a new place', 'get 3+ hackey sack tricks', 'shoot the soccer ball',
        'text/call an old friend', 'go to bed at 10pm'];
        let rando = Math.round(Math.random()*challenges.length);
    console.log(rando+challenges[rando])
    document.getElementById("challenge").innerHTML = `Daily challenge:<br>${challenges[rando]}`;

}

function journal(){
    const journal = document.getElementById("journal");
    journal.innerHTML+=`
    <div>
    <input type="text" placeholder="Journal" autofocus>
    `;
}

function goHome(){
    location.replace("./index.html")
}

function getDailyContent() {
    const date = new Date().toISOString().split('T')[0];
    const fact = document.getElementById('fact').innerText;
    const quote = document.getElementById('quote').innerText;
    const vocab = document.getElementById('vocab').innerText;
    const challenge = document.getElementById('challenge').innerText;
  
    const content = { date, fact, quote, vocab, challenge };
  
    fetch('/update-daily', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(content),
    })
    .then(response => response.text())
    .then(data => {
      console.log('Content updated:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  

getDailyContent();  

getFact();

getQuote();

getVocab();

getChallenge();