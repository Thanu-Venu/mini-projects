let countdown;
const startBtn=document.getElementById('startBtn');
const resetBtn=document.getElementById('resetBtn');
const dateInput=document.getElementById('dateInput');

startBtn.addEventListener('click',()=>{
    clearInterval(countdown); 
    let selectedTime=new Date(dateInput.value).getTime();

    if(!selectedTime){
        alert("please select a valid date and time");
        return;
    }

    countdown=setInterval(()=>{
        let now=new Date().getTime();
        let distance=selectedTime-now;

        if(distance<=0){
            clearInterval(countdown);
            document.getElementById('message').innerText="🎉 Time's up!!";
            updateTimer(0,0,0,0);
            return;
        }

        let days=Math.floor(distance/(1000*60*60*24));
        let hours=Math.floor((distance%(1000*60*60*24))/(1000*60*60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        updateTimer(days,hours,minutes,seconds);
    },1000);

});

resetBtn.addEventListener('click',()=>{
    clearInterval(countdown);
    dateInput.value="";
    document.getElementById('message').innerText="";
    updateTimer(0,0,0,0);
    return;

});

function updateTimer(d,h,m,s){
    document.getElementById('days').innerText=pad(d);
    document.getElementById('hours').innerText=pad(h);
    document.getElementById('minutes').innerText=pad(m);
    document.getElementById('seconds').innerText=pad(s);
}   

function pad(n){
    return n < 10 ? "0" + n : n;
}
