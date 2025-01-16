let question_field = document.querySelector('.question');
let answer_buttons = document.querySelectorAll('.answer');
let conteiner_h3 = document.querySelector('.container_h3');

function randint(min, max){
    return Math.round(Math.random() * (max - min) + min)
}

let signs = ['+','-','*','/']
function getRandomSign(){
    return signs[randint(0,3)]
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {  // Цикл проходиться по всіх елементах з кінця до початку
    let j = Math.floor(Math.random() * (i + 1));  // Вибираємо індекс рандомного елемента
    [array[i], array[j]] = [array[j], array[i]] // Міняємо місцями з поточним елементом.
  } 
}

class Question{
    constructor(){
        let a = randint(1, 30)
        let b = randint(1, 30)
        let sign = getRandomSign()
        this.question = `${a} ${sign} ${b}`
        if (sign =='+') {this.correct = a + b}
        else if (sign == '-') {this.correct = a - b}
        else if (sign == '*') {this.correct = a * b}
        else if (sign == '/') {this.correct = Math.round((a / b) * 100) / 100}
        this.answers = [
            randint(this.correct - 15, this.correct - 1),
            randint(this.correct - 15, this.correct - 1),
            this.correct,
            randint(this.correct + 1, this.correct + 15),
            randint(this.correct + 1, this.correct + 15),
        ]
        shuffle(this.answers)

    }
    
    display (){
        question_field.innerHTML = this.question
        for (let i = 0; i < this.answers.length; i += 1){
            answer_buttons[i].innerHTML = this.answers[i]
        }
    }
}

let correct_answers_given = 0
let total_answres_given = 0
let current_questin
current_questin = new Question()
current_questin.display()

setTimeout (function() {
    conteiner_h3.innerHTML =
    `Ви дали ${correct_answers_given} правильних відповідей із ${total_answres_given}.
    Точність - ${Math.round(correct_answers_given * 100 / total_answres_given)} %.`

}, 30000)

for ( let i = 0; i < answer_buttons.length; i += 1){
    answer_buttons[i].addEventListener('click' , function (){
        if (answer_buttons[i].innerHTML == current_questin.correct){
            correct_answers_given += 1
            answer_buttons[i].style.background = '#00FF00'
            anime({
                targets: answer_buttons[i],
                background:'#FFFFFF',
                duration: 500,
                delay:100,
                easing: 'linear'
            })
        } else{
            answer_buttons[i].style.background = '#FF0000'
            anime({
                targets: answer_buttons[i],
                background: '#FFFFFF',
                duration:500,
                delay: 100,
                easing:'linear'
            })
        }
        
        total_answres_given += 1

        
        current_questin = new Question()
        current_questin.display()
    })
}
