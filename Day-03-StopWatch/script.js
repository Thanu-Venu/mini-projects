let milliseconds=0;
let seconds=0;
let minutes=0;
let timer=null;
let running=false;
let progress=0;

const display = document.getElementById("display");
const lapsList = document.getElementById("laps");

window.onload = () => {
    loadLaps();
};

function updateDisplay(){
    let m=minutes<10 ? "0"+ minutes : minutes;
    let s=seconds<10 ? "0"+ seconds : seconds;
    let ms=milliseconds<10 ? "0"+ milliseconds : milliseconds;

    display.innerText=`${m}:${s}:${ms}`;

    document.querySelector(".progress-ring").style.transform=`rotate(${progress}deg)`;
    progress+=3.6;

}

function start(){
    if(!running){
        running=true;
        timer=setInterval(()=>{
            milliseconds++;
            if(milliseconds==100){
                milliseconds=0;
                seconds++;
            }
            if(seconds==60){
                seconds=0;
                minutes++;
            }
            updateDisplay();
        },10);
    }
}

function pause(){
    running=false;
    clearInterval(timer);
}

function reset(){
    running=false;
    clearInterval(timer);
    milliseconds=0;
    seconds=0;
    minutes=0;
    updateDisplay();
     // Clear lap history in the UI
    lapsList.innerHTML = '';

    // Clear lap history in localStorage
    localStorage.removeItem('laps');

}

function lap(){
    if(!running) return;

    let lapTime=display.innerText;

    let li=document.createElement("li");
    li.innerText=lapTime;

    lapsList.appendChild(li);

    saveLap(lapTime);
}

function saveLap(time){
    let laps=JSON.parse(localStorage.getItem("laps")) || [];
    laps.push(time);
    localStorage.setItem("laps",JSON.stringify(laps));
}

function loadLaps(){
    let laps=JSON.parse(localStorage.getItem("laps")) || [];

    laps.array.forEach(t => {
        let li=document.createElement("li");
        li.innerText=t;
        lapsList.appendChild(li);
        
    });
}

document.getElementById("mode").onclick = () => {
    document.body.classList.toggle("dark");
}

document.getElementById("start").addEventListener("click",start);
document.getElementById('pause').addEventListener('click',pause);
document.getElementById('reset').addEventListener('click',reset);
document.getElementById("lap").onclick = lap;

document.addEventListener("keydown",(e)=>{
    if (e.key === " ") start();        // Space = Start
    if (e.key === "p") pause();        // P = Pause
    if (e.key === "r") reset();        // R = Reset
    if (e.key === "l") lap();          // L = Lap
});

updateDisplay();