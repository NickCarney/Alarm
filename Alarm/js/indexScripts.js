//get current date time and insert it to paragraph
function getTime(){
    days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    let now = new Date();
    let datetime = now.toLocaleString();
    day = now.getDay();
    datetime = datetime.split(",");
    date = datetime[0];
    time = datetime[1];
    document.getElementById("datetime").innerHTML = time+"<br>"+days[day%7]+"<br>"+date;
    return datetime
}

//takes you to alarm page - used with alarm button
function goAlarm(){
    location.replace("alarm.html")
}

//takes you to daily page - used with daily button
function goDaily(){
    location.replace("daily.html")
}

//every 1000 milliseconds, rerun getTime()
setInterval(function() {
    getTime()
    }, 1000);
