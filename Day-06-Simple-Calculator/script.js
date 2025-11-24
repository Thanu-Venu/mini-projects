let display=document.getElementById("display");
let toggleHistoryBtn = document.getElementById("toggleHistory");
let historyBox = document.getElementById("historyBox");

toggleHistoryBtn.addEventListener("click", function () {
    if (historyBox.style.display === "none" || historyBox.style.display === "") {
        historyBox.style.display = "block";
        toggleHistoryBtn.textContent = "📜 Hide History";
    } else {
        historyBox.style.display = "none";
        toggleHistoryBtn.textContent = "📜 Show History";
    }
});
function appendValue(value){
    display.value+=value;
}

function clearAll(){
    display.value="";
}

function clearOne(){
    display.value=display.value.slice(0,-1);
}

function square(){
    if(display.value !== ""){
        display.value=Math.pow(display.value,2);
        saveHistory(`${display.value}²`);
    }
}

function squareRoot(){
    if(display.value !== ""){
        display.value=Math.sqrt(display.value);
        saveHistory(`√${display.value}`);
    }
}

function calculate(){
    try{
       let result=eval(display.value);
       saveHistory(`${display.value} = ${result}`);
        display.value=result;
    }catch{
        display.value="error"
    }
}

function saveHistory(entry) {
    let li = document.createElement("li");
    li.textContent = entry;

    // 🔥 Clicking history item loads it back to display
    li.addEventListener("click", () => {
        // Extract only the expression part if it has "="
        if (entry.includes("=")) {
            display.value = entry.split("=")[0].trim();
        } else {
            display.value = entry;
        }
    });

    historyList.appendChild(li);
}


document.addEventListener("keydown",function(e){
    if(!isNaN(e.key) || "+-*/.%".includes(e.key)){
        appendValue(e.key);
        
    }
    if(e.key==="Enter") calculate();
    if(e.key==="Backspace") clearOne();
    if(e.key==="Escape") clearAll();
});

let toggleBtn=document.getElementById("toggleTheme");
toggleBtn.addEventListener("click",()=>{
    document.body.classList.toggle("dark");
    toggleBtn.textContent=document.body.classList.contains("dark")? "☀️":"🌙";
});