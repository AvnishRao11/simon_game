let gameseq=[];
let userseq =[];
let btns=["red","yellow","purple","orange"];
let level=0;
let start=false;
let h2=document.querySelector("h2");

document.addEventListener('keydown',function(){
    if(start==false){
        console.log("game started");
        start=true;

        levelup();
    }
});

function gameflash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}
function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}

function levelup(){
    userseq=[];
    level++;
    h2.innerText=` Level:${level}`;
    //random btn chosse krna h 
    let randidx=Math.floor(Math.random()*4);
    let randcolor=btns[randidx];
    let randbtn=document.querySelector(`.${randcolor}`);
    if (!randbtn) {
        console.error("Button not found for color:", randcolor);
        return;  // Stop execution if no button is found
    }
    gameseq.push(randcolor);
    console.log(gameseq);
    gameflash(randbtn);
}
function checkans(index){
    // console.log("curr level is:",level);
    if( gameseq[index]===userseq[index]){
       if(userseq.length==gameseq.length){
        setTimeout(levelup,1000);
       }
    }
    else{
        h2.innerHTML=`Game over!! Your score is <b>${level}</b> <br> Press any key to start...`;
        document.querySelector('body').style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector('body').style.backgroundColor="white";
        },150);
        reset();
    }

}

function btnpress(){
   
    let btn=this;
    userflash(btn);
   let usercolor=btn.getAttribute('id');
    userseq.push(usercolor);
    // console.log(userseq);
    checkans(userseq.length-1);
}

let allbtns=document.querySelectorAll('.btn');
for (let btn of allbtns){
    btn.addEventListener('click',btnpress);
}

function reset(){
    start=false;
    level=0;
    userseq=[];
    gameseq=[];
}