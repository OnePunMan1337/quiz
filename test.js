class person {
    constructor(id, name, film) {
        this.name = name;
        this.film = film;
        this.score = 0;
        this.id = id;
        this.background = './img/photos/' + id + '(2).jpg';
        this.photo = './img/photos/' + id + '(1).png';
    }
}

class answer {
    constructor(text, personsIds) {
        this.text = text;
        this.personsIds = personsIds;
    }
}


class question {
    constructor(text, answers) {
        this.text = text;
        this.answers = answers;
    }
}

class quiz {
    constructor(persons, questions) {
        this.persons = persons;
        this.questions = questions;
        this.currentQuestion = 0;
    }

    select(index) {
        this.persons.filter(x => this.questions[this.currentQuestion - 1].answers[index].personsIds.some(y => y === x.id)).forEach(x => x.score++);
    }

    getAnswer() {
        return this.persons.reduce((prev, current) => (prev.score > current.score) ? prev : current)
    }

    nextQuestion() {
        if (this.currentQuestion >= this.questions.length) return null;
        let q = this.questions[this.currentQuestion];
        this.currentQuestion++;
        return q;
    }

    getProgress() {
        return Math.round((this.currentQuestion - 1) / this.questions.length * 100);
    }

    getScore(personId) {
        return Math.round(this.persons.find(x => x.id === personId).score / this.questions.length * 100);
    }
}


document.getElementById('start').addEventListener('click', start);

let game;

function createQuiz() {
    let persons = [
        new person(1, 'Клоун Пеннивайз', 'Оно'),
        new person(2, 'Фредди Крюгер', 'Кошмар на улице вязов'),
        new person(3, 'Кукла Чаки', 'Детские игры'),
        new person(4, 'Акула', 'Челюсти'),
        new person(5, 'Коллекционер', 'Коллекционер'),
        new person(6, 'Джон Крамер', 'Пила'),
        new person(7, 'Монстр Франкенштейна', 'Франкенштейн'),
        new person(8, 'Укурыш', 'Очень страшное кино 2'),
        new person(9, 'Джоуи', 'Пятница 13-е, 5 часть'),
        new person(10, 'Эллен Рипли', 'Чужой')
    ];

    let questions = [
        new question('Каким образом вы любите приносить страдания людям?',
            [
                new answer('Больше физически', [4, 5]),
                new answer('Больше морально', [6]),
                new answer('Любым', [1, 2, 3]),
                new answer('Не люблю', [7, 9, 10]),
                new answer('Чувак...', [8])
            ]),
        new question('Вы человек?',
            [
                new answer('Я потустороннее существо', [1, 2, 3, 7]),
                new answer('Ну допустим', [5, 6, 8, 9, 10]),
                new answer('Я животное', [4]),
                new answer('Чувак', [8])
            ]),
        new question('У вас тяжелое прошлое?',
            [
                new answer('Да..', [2, 3, 6, 9]),
                new answer('Я не знаю', [1, 4, 5, 7]),
                new answer('Прошлое как прошлое', [10]),
                new answer('ЧуВаК', [8])
            ]),
        new question('У вас есть суперспособности?',
            [
                new answer('Я есть суперспособность', [1, 2, 3, 7]),
                new answer('Откуда?', [4, 5, 6, 9, 10]),
                new answer('ЧУВАК', [8])
            ]),
        new question('Как вы оцениваете свои умственные характеристики?',
            [
                new answer('Пойдет', [3, 9]),
                new answer('…', [4, 7]),
                new answer('Я гений во плоти', [1, 2, 5, 6, 10]),
                new answer('ЧУВААААК', [8])
            ]),
        new question('Какой у вас цвет волос?',
            [
                new answer('Я рыжий', [1, 3]),
                new answer('Я темноволосый', [7, 9, 10]),
                new answer('Это больная для меня тема...', [2, 4, 5, 6]),
                new answer('ЧУВААААААААААААААК', [8])
            ]),
        new question('А как бы вы оценили свою внешность?',
            [
                new answer('У нас тоже есть чувства...', [2, 4, 7, 9]),
                new answer('Насрать', [1, 3, 5, 6]),
                new answer('Я доволен собой', [10]),
                new answer('ВАЗААААААААП', [8])
            ]),
        new question('Вы внушаете доверие?',
            [
                new answer('От одного моего вида можно обосраться, о чем речь?', [1, 2, 3, 4, 5, 7]),
                new answer('Вполне себе', [6, 9, 10]),
                new answer('ЧУ ЧТО? ЧУ ВАААААААК', [8])
            ]),
        new question('Что вами движет?',
            [
                new answer('Добро, брат', [9, 10]),
                new answer('Своеобразное добро', [6, 7]),
                new answer('Месть', [2, 3]),
                new answer('У меня нет мотива, я такой сам по себе', [1, 4, 5]),
                new answer('Полтора кило мармиладок', [8]),
            ]),
        new question('Ваше орудие убийства?',
            [
                new answer('Все своё при себе имеется', [4, 7]),
                new answer('Что-то острое, наверное', [2, 3]),
                new answer('Знаете ли, я и сам своего рода изобретатель', [1, 5, 6]),
                new answer('Да я добряк по жизни, заебал', [9, 10]),
                new answer('Я негр из фильма “Очень страшное кино 2”', [8])
            ]),
        new question('Вы красноречивы?',
            [
                new answer('Из всех возможных языков я выбрал язык фактов', [1, 2, 6]),
                new answer('Bruh, я за весь фильм ни слова не сказал', [3, 4, 5]),
                new answer('Я говорить неплохо', [7]),
                new answer('Мне не дали особо много поговорить', [9]),
                new answer('Мне не с кем общаться', [10]),
                new answer('Я негр из фильма “Очень страшное кино 2”', [8])
            ]),
        new question('Какой антураж вам по душе?',
            [
                new answer('Лагерь в лесу', [9]),
                new answer('Заброшки', [5, 6]),
                new answer('Мне бы в морэ', [4]),
                new answer('Дома уютные', [3, 8]),
                new answer('Я являюсь там, где захочу и тогда, когда захочу', [1, 2]),
                new answer('Лаборатория', [7]),
                new answer('КОСМОС ЕБАТЬ', [10])
            ]),
        new question('Как вы расправляетесь со своими жертвами ?',
            [
                new answer('У меня нет жертв', [8, 9, 10]),
                new answer('Я бы сказал “изобретательно”', [5, 6]),
                new answer('Подстерегаю их, когда они наедине', [1, 2, 3]),
                new answer('Просто скажи мне время и место', [4]),
                new answer('Я вообще сам по себе жертва', [7])
            ]),
        new question('На кого охотимся?',
            [
                new answer('На ссыкунов всяких', [1, 2]),
                new answer('На всех', [3, 4, 5]),
                new answer('На тех, кто этого заслуживает', [6]),
                new answer('Вообще-то это за мной охотятся', [10]),
                new answer('Ни на кого', [7,8,9])
            ])
    ];
    return new quiz(persons, questions);
}

let text, answers, progress;

function initView() {
    document.getElementById('quiz').innerHTML = '<div class="progress"><div class="progress-bar"></div></div><div class="test"><div class="question"></div><div class="answers"></div><div class="submit"><button class="submit-feedback">Далее</button></div></div>';

    text = document.querySelector('.question');
    answers = document.querySelector('.answers');
    progress = document.querySelector('.progress-bar');
    let submit = document.querySelector('.submit-feedback');
    submit.addEventListener('click', () => {
        let ind = document.querySelector('input[name="answer"]:checked');
        if (ind != null) nextQuestion(ind.value);
    });
    let q = game.nextQuestion();
    showQuestion(q);
}

function nextQuestion(index) {
    game.select(index);
    let q = game.nextQuestion();
    q === null ? showAnswer(game.getAnswer()) : showQuestion(q);
}

function showQuestion(q) {
    text.innerHTML = '<h2>' + q.text + '</h2>';
    let html = '';
    for (let i = 0; i < q.answers.length; i++) {
        html += '<div class="answer"><input type="radio" name="answer" value="' + i + '" id="id' + i + '"><label for="id' + i + '">' + q.answers[i].text + '</label></div>';
    }
    answers.innerHTML = html;
    let process = game.getProgress();
    progress.innerHTML = process + '%';
    progress.style.width = process + '%';
}

function showAnswer(person) {
    document.getElementById('quiz').innerHTML = '<div class="test"><div class="name"><h2>На ' + game.getScore(person.id) + '% ты ' + person.name + ' (из фильма "' + person.film + '")</h2></div><div class="person"><img src="' + person.background + '" class="person-background" alt=""><img src="' + person.photo + '" class="person-photo" alt=""></div><div class="submit"><button id="start" class="submit-feedback">Заново</button></div></div>';
    document.getElementById('start').addEventListener('click', start);
}

function start() {
    game = createQuiz();
    initView();
}

document.querySelector('.scream-btn').onclick = scream;

let container = document.querySelector('.container'), screamer = document.querySelector('.screamer'),
    screamBtn = document.querySelector('.scream-btn');

let texts = ['Вы проголосовали за поправки в конституцию. Нажмите, чтобы отменить.', 'Быстро включи звук обратно!', 'Нажми, или твоя мама умрёт', 'Нажмите, чтобы продлить срок Навальскому', 'У этой бабки сифак походу, она рассыпается', 'Заебал, хватит', 'Нажми, если считаешь Антона педиком', 'Ебать, скример, вы это видели?', 'Кто Вы из фильма "Криминальное чтиво"']
let count = 0;

function scream() {
    screamBtn.innerHTML = texts[count];
    count = (count + 1) % texts.length;
    container.style.display = 'none';
    screamer.style.display = 'block';
    screamer.volume = 1;
    screamer.play();
    setTimeout(() => {
        screamer.style.display = 'none';
        container.style.display = 'block';
    }, 2000)
    return false;
}