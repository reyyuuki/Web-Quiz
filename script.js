const Types = document.getElementsByClassName("Types")[0];
const Category = document.getElementsByClassName("Category");
const Main = document.getElementsByClassName("main-content")[0];
const QuestionElmt = document.getElementsByClassName("question")[0];
const Option = document.getElementsByClassName("option")[0];
const ScoreElmt = document.getElementsByClassName("score")[0];
const Nextbtn = document.getElementsByClassName("next")[0];
const Submitbtn = document.getElementsByClassName("submit")[0];
const ResultElmt = document.getElementsByClassName("result")[0];
const Text = document.getElementsByClassName("Text")[0];
const Total = document.getElementsByClassName("Total")[0];
const Resetbtn = document.getElementsByClassName("restart")[0];
const Welcome = document.getElementsByClassName("Welcome")[0];
const answerText = document.getElementsByClassName("answerText")[0];
const audio = document.getElementById("Audio");

let index = 0;
let CategoryIndex = 0;
let isrunning = false;
let score = 0;

const QuizList = {
    0: {
        CategoryName: "Anime",
        QuestionList: [
            {
                question: "Q1. In which anime series does a young ninja aspire to become the strongest ninja in his village?",
                options: ["A. Naruto", "B. Bleach", "C. One Piece", "D. Dragon Ball Z"],
                answer: "A. Naruto"
            },
            {
                question: "Q2. Who is the main protagonist in the anime 'Attack on Titan'?",
                options: ["A. Eren Yeager", "B. Mikasa Ackerman", "C. Levi Ackerman", "D. Armin Arlert"],
                answer: "A. Eren Yeager"
            },
            {
                question: "Q3. Which anime features a character named Monkey D. Luffy who aims to become the Pirate King?",
                options: ["A. One Piece", "B. Fairy Tail", "C. Black Clover", "D. My Hero Academia"],
                answer: "A. One Piece"
            },
            {
                question: "Q4. In 'Death Note', who is the primary antagonist who uses the Death Note to rid the world of criminals?",
                options: ["A. Light Yagami", "B. L", "C. Misa Amane", "D. Ryuk"],
                answer: "A. Light Yagami"
            }

        ]
    },
    1: {
        CategoryName: "Sports",
        QuestionList: [
            {
                question: "Q1. Which country won the FIFA World Cup in 2018?",
                options: ["A. Brazil", "B. Germany", "C. France", "D. Argentina"],
                answer: "C. France"
            },
            {
                question: "Q2. Who is the all-time leading scorer in NBA history?",
                options: ["A. Michael Jordan", "B. LeBron James", "C. Kareem Abdul-Jabbar", "D. Kobe Bryant"],
                answer: "C. Kareem Abdul-Jabbar"
            },
            {
                question: "Q3. In which sport would you perform a 'slam dunk'?",
                options: ["A. Tennis", "B. Soccer", "C. Basketball", "D. Golf"],
                answer: "C. Basketball"
            },
            {
                question: "Q4. What is the standard number of players on a baseball team?",
                options: ["A. 9", "B. 11", "C. 7", "D. 5"],
                answer: "A. 9"
            }

        ],
    },
    2: {
        CategoryName: "Geography",
        QuestionList: [

            {
                question: "Q1. Which continent is the largest by land area?",
                options: ["A. Africa", "B. Asia", "C. North America", "D. Europe"],
                answer: "B. Asia"
            },
            {
                question: "Q2. What is the capital city of Australia?",
                options: ["A. Sydney", "B. Melbourne", "C. Canberra", "D. Brisbane"],
                answer: "C. Canberra"
            },
            {
                question: "Q3. The Amazon River is located primarily in which continent?",
                options: ["A. Africa", "B. South America", "C. Asia", "D. North America"],
                answer: "B. South America"
            },
            {
                question: "Q4. Which country is known as the 'Land of the Rising Sun'?",
                options: ["A. China", "B. Japan", "C. South Korea", "D. Thailand"],
                answer: "B. Japan"
            }
        ]
    }
}


Option.innerHTML = `    <div class="Answer Hover"></div>
                        <div class="Answer Hover"></div>
                        <div class="Answer Hover"></div>
                        <div class="Answer Hover"></div>`;


function Start() {
    Types.style.display = "flex";
    Welcome.style.display = "none";
    for (let i = 0; i < Category.length; i++) {
        Category[i].innerHTML = QuizList[i].CategoryName;
        Category[i].addEventListener('click', () => {
            Types.style.display = "none";
            Main.style.display = "flex";
            CategoryIndex = i;
            fillElmt();
        });
    }
}

function fillElmt() {
    QuestionElmt.textContent = QuizList[CategoryIndex].QuestionList[index].question;
    for (let j = 0; j < Option.children.length; j++) {
        Option.children[j].textContent = QuizList[CategoryIndex].QuestionList[index].options[j];
    }
}

function QuizGame() {
    fillElmt();
    for (let i = 0; i < Option.children.length; i++) {
        Option.children[i].addEventListener('click', () => {
            if (!isrunning) {
                Option.children[i].style.backgroundColor = "teal";
                setTimeout(() => {
                    if (Option.children[i].textContent === QuizList[CategoryIndex].QuestionList[index].answer) {
                        Option.children[i].style.backgroundColor = "green";
                        score += 25;
                        ScoreElmt.textContent = `Score: ${score}`;
                        answerText.style.display = "block";
                        answerText.textContent = "Oh yeah, its Correct! Congratulations";
                        answerText.style.color = "green";
                        audio.src = "Correct.mp3";
                        audio.play();
                    }
                    else {
                        Option.children[i].style.backgroundColor = "black";
                        answerText.style.display = "block";
                        answerText.textContent = "No, it is Wrong Answer! Try harder";
                        answerText.style.color = "red";
                        audio.src = "Wrong.mp3";
                        audio.play();
                    }
                }, 500);
                isrunning = true;
            }
            else {
                window.alert("Please click on Next button to continue");
            }
        });
    }



    Nextbtn.addEventListener("click", () => {
        index++;
        if (isrunning) {
            for (let i = 0; i < Option.children.length; i++) {
                Option.children[i].style.backgroundColor = "orangered";
                answerText.style.display = "none";
            }
            isrunning = false;
            if (index > QuizList[0].QuestionList.length - 1) {
                Main.style.display = "none";
                Result();
            }
            else {
                fillElmt();
            }
        } else {
            window.alert("Please select an option");
        }
    });

}

function checkAnswer() {

}


function Result() {
    ResultElmt.style.display = "flex";
    if (score == 0) {
        Text.textContent = `Better luck next time!`;
        Total.textContent = `Total score is ${score}`;
    }
    else if (score == 25) {
        Text.textContent = `Your are good!`;
        Total.textContent = `Total score is ${score}`;
    }
    else if (score == 50) {
        Text.textContent = `Your are very nice!`;
        Total.textContent = `Total score is ${score}`;
    }
    else if (score == 75) {
        Text.textContent = `Your are Exellent!`;
        Total.textContent = `Total score is ${score}`;
    }
    else if (score == 100) {
        Text.textContent = `Your are Amazing! Perfect!`;
        Total.textContent = `Total score is ${score}`;
    }

}
Resetbtn.addEventListener("click", () => {
    index = 0;
    score = 0;
    ResultElmt.style.display = "none";
    Types.style.display = "flex";
    fillElmt();
});
QuizGame();
