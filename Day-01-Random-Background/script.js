const button=document.getElementById('change-bg-button');

function changeBackground(){
    const randomColor='#' + Math.floor(Math.random()*16777215).toString(16);
    document.body.style.backgroundColor=randomColor;
}
// Change background when button is clicked
button.addEventListener('click',changeBackground);

// Bonus: Change background automatically every 5 seconds
setInterval(changeBackground,5000);