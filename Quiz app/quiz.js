const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement=document.getElementById('question-container');
const questionElement=document.getElementById('question');
const answerButtonsElement=document.getElementById('answer-btns');

startButton.addEventListener('click',startQuiz);
nextButton.addEventListener("click",()=>{
    currentQuestionIndex++;
    setNextQustion();
})

let shuffledQuestions, currentQuestionIndex;

function startQuiz(){
    startButton.classList.add("hide");
    shuffledQuestions=questions.sort(()=>Math.random()-0.5);
    currentQuestionIndex=0;
    questionContainerElement.classList.remove("hide");
    setNextQustion();
}

function setNextQustion(){
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question){
    questionElement.innerText=question.question;
    question.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if(answer.correct){
            button.dataset.correct=answer.correct
        }
        button.addEventListener("click",selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState(){
    clearStatusClass(document.body)
    nextButton.classList.add("hide");
    while(answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e){
    const selectedButton=e.target;
    const correct=selectedButton.dataset.correct;
    setStatusClass(document.body,correct);
    Array.from(answerButtonsElement.children).forEach((button)=>{
        setStatusClass(button,button.dataset.correct);
    });
    if(shuffledQuestions.length>currentQuestionIndex+1){
        nextButton.classList.remove("hide");
    }else{
        startButton.innerText="restart quiz";
        startButton.classList.remove("hide");
    }
}

function setStatusClass(element,correct){
    if(correct){
        element.classList.add("correct");
    }else{
        element.classList.add("wrong");
    }
}

function clearStatusClass(element){
    element.classList.remove("wrong");
    element.classList.remove("correct");
}

const questions =[
    {
        question:"Who discovered HTML?",
        answers:[
            {text:"Brendan Eich",correct:false},
            {text:"Håkon Wium Lie",correct:false},
            {text:"Tim Berners-Lee",correct:true},
            {text:"Jordan Walke",correct:false},
        ]
    },
    {
        question:"Who discovered CSS?",
        answers:[
            {text:"Håkon Wium Lie",correct:true},
            {text:"Jordan Walke",correct:false},
            {text:"Tim Berners-Lee",correct:false},
            {text:"Brendan Eich",correct:false},
        ]
    },
    {
        question:"Who discovered JAVASCRIPT?",
        answers:[
            {text:"Jordan Walke",correct:false},
            {text:"Miško Hevery",correct:false},
            {text:"Tim Berners-Lee",correct:false},
            {text:"Brendan Eich",correct:true},
        ]
    },
    {
        question:"Who discovered REACT.JS?",
        answers:[
            {text:"Brendan Eich",correct:false},
            {text:"Jordan Walke",correct:true},
            {text:"Håkon Wium Lie",correct:false},
            {text:"Tim Berners-Lee",correct:false},
        ]
    },
    {
        question:"Who discovered ANGULER.JS?",
        answers:[
            {text:"Håkon Wium Lie",correct:false},
            {text:"Miško Hevery",correct:true},
            {text:"Brendan Eich",correct:false},
            {text:"Tim Berners-Lee",correct:false},
        ]
    },
]