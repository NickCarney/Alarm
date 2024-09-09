//Gets and starts the sound for the alarm to play
function getAudio(){
    //setting up a random sound to play automatically
    sounds = ['sounds/lluvia-rain-110426.mp3','sounds/rain-110508.mp3','sounds/rain-and-thunder-16705.mp3','sounds/rain-and-thunder-60077.mp3','sounds/rain-in-forest-birds-nature-111405.mp3','sounds/rainy-day-in-town-with-birds-singing-194011.mp3','sounds/snow-rain-bird-chirping-19560.mp3']
    let rando = Math.round(Math.random() *(sounds.length-1));
    randomSound = sounds[rando];
    console.log(rando+randomSound);
    document.getElementById("audio").src = randomSound;

}

//gets random image from the nga.gov open source database. Thank you national gallery of art.
function getImage(){
    onload = fetch("./published_images.csv").then(res=>{
        return res.text();
    }).then(data=>{
        let photoUrls = [];
        let dataRows = data.split("\n").slice(1);
        let rando = Math.round(Math.random() *dataRows.length);
        for (let i = 1; i < dataRows.length;i++){
            photoUrls.push(dataRows[i].split("\"")[1]);
        }
        document.getElementById("image").src = photoUrls[rando];
    })

}

//adds html to the alarmForm section to ask when to set an alarm - works with set alarm button
function getAlarm(){
    document.getElementById("alarmForm").innerHTML = `<h4 id="alarmText">Set Your Alarm</h4><br>
    <input id="alarmInput" type="time" value="08:47"></input><br>
    <input id="alarmSubmit" type="submit" value="set" onclick="setAlarm()"></input>`;
    
}

//this will find out when their alarm is set
function getAlarmTime(time){
    const now = Date.now();

    let midnight_tn = new Date();
    midnight_tn.setHours(24,0,0,0);

    time = time.toLocaleString();
    time = time.split(":");
    let time_ms = 0;
    time_ms = time_ms+3600000*parseInt(time[0]);
    time_ms = time_ms+60000*parseInt(time[1]);
    const milliseconds_until_alarm = midnight_tn.valueOf()+time_ms;

    const alarmTime = new Date(milliseconds_until_alarm).toLocaleString();
    alarmList = alarmTime.split();
    return alarmList;
}

//after the alarm is set, this function will tell the user that their alarm is set for a certain time
//This function uses getAlarmTime to find out when the alarm is set compared to now.
function setAlarm(){
    document.getElementById('alarmForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        let time = document.getElementById('alarmInput').value;

        document.getElementById("alarmForm").innerHTML = `<h4>Alarm set for:</h4><p>${time}</p>`;
        
        let alarmList = getAlarmTime(time);

        return alarmList;
    });
    
}

//instead of reloading, this page should prevent the default and log that the alarm is set - used with submit button for alarm
function noReload(event){
    event.preventDefault(); // Prevent the default form submission

    console.log('Alarm set!');
}

//snoozes the audio, then returns the audio after x milliseconds
function snooze(){
    let audio = document.getElementById("audio");
    audio.pause()
    setTimeout(function() {
        getAudio()
        }, 420000);
    moveSnooze();
}

//this function will put the snooze button at a random spot
function moveSnooze(){
    const width = screen.width;
    const height = screen.height;

    let randomWidth = Math.round(Math.random() *(width-1))+'px';
    let randomHeight = Math.round(Math.random() *(height-1))+'px';

    document.getElementById("snooze").style.top = randomWidth;
    document.getElementById("snooze").style.left = randomHeight;

}

//this function will generate a new random picture - used with new pic button
function newPic(){
    getImage()
}

//goes home - home button
function goHome(){
    location.replace("./index.html")
}

//call these functions when the page loads to automatically get audio and image
getAudio();

getImage();

