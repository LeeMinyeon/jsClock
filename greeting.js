const form=document.querySelector(".js-form"),
input = form.querySelector("input"),
greeting=document.querySelector(".js-greeting");

const USER_LS="currentUser",
    SHOWING_CN="showing";


function saveName(name){
    localStorage.setItem(USER_LS,name);
}
function handSubmit(event){
    event.preventDefault();
    const currentValue=input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
   
}
function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit",handSubmit);
}
function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText=`Hello ${text}`;
}
function loadName(){
    const currentUser= localStorage.getItem(USER_LS);
    if(currentUser===null){
        askForName();

    }else{
        paintGreeting(currentUser);
    }

}
function init(){
    loadName();
}
init();