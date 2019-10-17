const questionsAndAnsvers =[{"question":"Which is the world's highest mountain?", 0:"K2", 1:"Kilimanjaro", 2:"Mount Everest", 3:"Makalu", "answer":2},
{"question":"Which of these cities is not in Europe?", 0:"Barcelona", 1:"Prague", 2:"Moscow", 3:"Reykjavik", "answer":2},
{"question":"Which of the following countries do not border France?", 0:"Netherlands", 1:"Germany", 2:"Spain", 3:"Italy", "answer":0},
{"question":"What is the approximate size of Earth's equator?" , 0:"40.000 km", 1:"20.000 km", 2:"30.000 km", 3:"50.000 km", "answer":0},
{"question":"Which is the smallest country, measured by total land area?", 0:"Monaco", 1:"Vatican City", 2:"Maldives", 3:"Tuvalu", "answer":1}
];
var checkedarray = [0,0,0,0,0];
var countback = 0;
var checkedi;
var haveback = 0;
var startbutton = document.getElementById("startbutton");
var usernameinput = document.getElementById("usernameinput");
var username = document.getElementById("username");
var questions = document.getElementById('questions');
var idn = document.getElementById('idn');
var question = document.getElementById('question');
var start = document.getElementById('start');
var back = document.getElementById('back');
var nameandpoints = document.getElementById('nameandpoints');
var end = document.getElementById('end');
var next = document.getElementById('next');
var result = document.getElementById('result');
var newgame = document.getElementById('newgame');
var answersspan = document.getElementsByClassName('answersspan');
var radio = document.getElementsByName('one');
startbutton.addEventListener('click', function(){
    if(usernameinput.value){
        start.style.display = "none";
        next.style.display = "inline-block";
        back.style.display = "none";
        end.style.display = "none";
        questions.style.display = "flex"; 
        username.innerHTML = usernameinput.value;
        question.innerHTML = "." + questionsAndAnsvers[0].question;
        idn.innerHTML = 1;
        for(let i = 0; i < answersspan.length; i++){
            answersspan[i].innerHTML = questionsAndAnsvers[0][i];
        }
    }
})
next.addEventListener("click", function(){
    if(haveback){
        countback = 0;
    } 
    let a = 0;
    for(let i = 0; i < radio.length; i++){
        if(radio[i].checked === true){
            a = 1;
            checkedi = i;
            break;
        }
    }
    if(a === 0){
        return;
    }
    let b = idn.innerHTML;
    if(idn.innerHTML == questionsAndAnsvers.length-1){
        next.style.display = "none";
        end.style.display = "inline-block";
    }
    question.innerHTML = "." + questionsAndAnsvers[b].question;
    idn.innerHTML = +b + 1;
    for(let i = 0; i < answersspan.length; i++){
        answersspan[i].innerHTML = questionsAndAnsvers[b][i];
    }
    for(let i = 0; i < radio.length; i++){
        radio[i].checked = false;  
    }
    if(idn.innerHTML != 1){
        back.style.display = "inline-block";        
    }
})
back.addEventListener('click', function(){
    haveback = 1;
    if(countback === 1){
        return;
    }
    countback = 1;
    if(idn.innerHTML == 2){
        back.style.display = "none";        
    }
    let b = idn.innerHTML;
    question.innerHTML = "." + questionsAndAnsvers[b-2].question;
    idn.innerHTML = +b - 1;
    for(let i = 0; i < answersspan.length; i++){
        answersspan[i].innerHTML = questionsAndAnsvers[b-2][i];
    }
    if(idn.innerHTML != questionsAndAnsvers.length-2){
        next.style.display = "inline-block";
        end.style.display = "none";
    }
    radio[checkedi].checked = true;
})
for(let i = 0; i < radio.length; i++){
    radio[i].addEventListener('click', function(){
        checkedarray[ +idn.innerHTML - 1] = i;
    })
}
end.addEventListener("click", function(){
    let a = 0;
    for(let i = 0; i < radio.length; i++){
        if(radio[i].checked === true){
            a = 1;
            break;
        }
    }
    if(a === 0){
        return;
    }
    result.style.display = "flex";
    result.append(nameandpoints);
    questions.style.display = "none";
    let points = 0;
    checkedarray.forEach(function(v,i){
        if(v == questionsAndAnsvers[i].answer){
            points ++;
        }
    })
    nameandpoints.innerHTML = username.innerHTML + " - " + points +"/5";
    for(let i = 0; i < questionsAndAnsvers.length; i++){
        var endQuestionsAndAnsvers = document.createElement('div');
        var endQuestion = document.createElement("p");
        var answertrue = document.createElement("p");
        var imgtrue = '<img src="images/true.png" class="truefalseimg">';
        var imgfalse = '<img src="images/false.png" class="truefalseimg">';
        endQuestionsAndAnsvers.classList.add('endQuestionsAndAnsvers');
        endQuestion.classList.add('endquestions');
        answertrue.classList.add('trueanswer');
        endQuestion.innerHTML = (i+1) + ". " + questionsAndAnsvers[i].question;
        answertrue.innerHTML = imgtrue + questionsAndAnsvers[i][questionsAndAnsvers[i].answer];
        endQuestionsAndAnsvers.append(endQuestion, answertrue);
        if(questionsAndAnsvers[i].answer !== checkedarray[i]){
            var answerfalse = document.createElement("p");
            answerfalse.innerHTML = imgfalse + questionsAndAnsvers[i][checkedarray[i]];
            answerfalse.classList.add('useranswer');
            endQuestionsAndAnsvers.append(answerfalse);
        }
        result.append(endQuestionsAndAnsvers);
    }
    result.append(newgame);
})
newgame.addEventListener("click", function(){
    result.style.display = "none";
    start.style.display = "flex";
    usernameinput.value="";
    checkedarray = [0,0,0,0,0];
    countback = 0;
    haveback = 0;
    checkedi = "";
    for(let i = 0; i < radio.length; i++){
        radio[i].checked = false;  
    }
    result.innerHTML = '';
})
