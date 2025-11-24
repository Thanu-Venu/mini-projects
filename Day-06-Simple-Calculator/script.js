let display=document.getElementById("display");

function appendValue(value){
    display.value+=value;
}

function clearAll(){
    display.value="";
}

function clearOne(){
    display.value=display.value.slice(0,-1);
}

function calculate(){
    try{
        display.value=eval(display.value);
    }catch{
        display.value="error"
    }
}