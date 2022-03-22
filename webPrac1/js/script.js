document.addEventListener("DOMContentLoaded", () => {
  const task0 = document.querySelector(".btn__run-0"),
    task1 = document.querySelector(".btn__run-1"),
    task2 = document.querySelector(".btn__run-2"),
    task3 = document.querySelector(".btn__run-3"),
    task4 = document.querySelector(".btn__run-4"),
    task5 = document.querySelector(".btn__run-5"),
    date = document.querySelector(".date"),
    stopTimer = document.querySelector(".btn_stop-timer");
  // 0 Задача
  const personalDB = {
    name: "",
    start: () => {
      personalDB.name = prompt("Ваше имя?", "");

      while (personalDB.name == "" || personalDB.name == null) {
        personalDB.name = prompt("Вы не указали своё имя", "");
      }
      localStorage.setItem("name", personalDB.name);
    },
  };

  if (localStorage.getItem("name") !== null) {
    const nameUser = document.querySelector(".header__hello-user");
    nameUser.innerHTML = `Привет  ${localStorage.getItem("name")}`;
  }

  task0.addEventListener("click", personalDB.start);
  task1.addEventListener("click", fnTask1);
  task2.addEventListener("click", fnTask2);
  task3.addEventListener("click", fnTask3);
  // task4.addEventListener("click", fnTask4);

  function fnTask1() {
    const h = +prompt("Введите высоту", "");
    const a = +prompt("Введите сторону", "");
    trArea(h, a);

    function trArea(v1, v2) {
      if (Number.isInteger(Number(v1)) || Number.isInteger(Number(v2))) {
        if (v1 > 0 && v2 > 0) {
          alert(`Площадь ${0.5 * (v1 * v2)}`);
        } else {
          alert("Вы ввели не корректное значение");
        }
      } else {
        alert("Вы ввели не числа");
      }
    }
  }
  function fnTask2() {
    const str1 = prompt("Введите строку1", "");
    const str2 = prompt("Введите  строку2", "");

    if (str1.length === str2.length) {
      alert(true);
    } else alert(false);
  }

  function fnTask3() {
    let flagNan = false;
    let str = prompt("Введите значения через запятую", "");
    while (str == "" || str == null) {
      str = prompt("Вы не указали значчения", "");
    }

    const arr = str.split(",").map((x) => +x);
    for (let x of arr) {
      if (isNaN(x)) flagNan = true;
    }
    if (!flagNan) {
      let min = arr[0];
      let max = arr[0];
      arr.forEach((x) => {
        if (typeof x === "string") {
          alert("Вы ввели не числа ");
        }
        if (x < min) min = x;
        if (x > max) max = x;
      });
      alert(`Минимальное:${min}  Максимальное:${max}`);
    } else alert("Вы ввели строку ");
  }
  ///modal

  const modalTrigger = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal");
  console.log(modalTrigger);
  modalTrigger.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });
  task5.addEventListener("click", openModal);

  function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }

  function openModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimerId);
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute("data-close") == "") {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  const modalTimerId = setTimeout(openModal, 300000);

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }
  window.addEventListener("scroll", showModalByScroll);

  //Test
  const quizData = [
    {
      question: "What does HTML stand for?",
      a: "Helicopters Terminal Motorboats Lamborginis",
      b: "Hypertext Markup Laguage",
      c: "Hyperloop Machine Language",
      correct: "b",
    },
    {
      question: "What does CSS stand for?",
      a: "Cascading Style Sheets",
      b: "Cars SUVs Sailboats",
      c: "Central Style Sheets",
      correct: "a",
    },
    {
      question: "What year did JavaScript appear?",
      a: "1899",
      b: "2005",
      c: "1995",
      correct: "c",
    },
    {
      question: "Who is the author of the JavaScript language?",
      a: "Bill Gates",
      b: "Brendan Eich",
      c: "Steve Jobs",
      correct: "b",
    },
    {
      question: "What language is this project written in?",
      a: "JavaScript",
      b: "Ruby",
      c: "C++",
      correct: "a",
    },
  ];
  function getTime() {
    /*newDate.getFullYear(); //2019
    newDate.getMonth(); // 10
    newDate.getDate(); // 11
    const date = document.querySelector(".date");
    date.innerHTML = "gggggg";
    date.innerHTML = personalDB.name;*/
  }

  const quiz = document.getElementById("quiz");
  const answerElements = document.querySelectorAll(".answer");
  const questionElement = document.getElementById("question");
  const a_text = document.getElementById("a_text");
  const b_text = document.getElementById("b_text");
  const c_text = document.getElementById("c_text");
  const submit = document.getElementById("submit");

  let currentQuiz = 0;
  let score = 0;

  loadQuiz();

  function loadQuiz() {
    deselectAnswers();

    const currentQuizData = quizData[currentQuiz];

    questionElement.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;

    getTime();
  }

  function deselectAnswers() {
    answerElements.forEach((answerEl) => (answerEl.checked = false));
  }

  function getSelected() {
    let answer;

    answerElements.forEach((answerEl) => {
      if (answerEl.checked) {
        answer = answerEl.id;
      }
    });

    return answer;
  }

  submit.addEventListener("click", () => {
    const answer = getSelected();

    if (answer) {
      if (answer === quizData[currentQuiz].correct) {
        score++;
      }

      currentQuiz++;

      if (currentQuiz < quizData.length) {
        loadQuiz();
      } else {
        quiz.innerHTML = `<h2>You answered coreectly at ${score}/${quizData.length} questions</h2>
            <button id="reload" onclick="location.reload()">x</button>
            `;
      }
    }
  });

  // Timer

  let deadline = new Date();

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      seconds = Math.floor((t / 1000) % 60),
      minutes = Math.floor((t / 1000 / 60) % 60),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24);

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return "0" + num;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();
    function reset(timeInterval) {
      console.log(timeInterval);
      clearInterval(timeInterval);
    }
    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        reset(timeInterval);
      }
    }
    stopTimer.addEventListener("click", () => {
      clearInterval(timeInterval);
      setClock(".timer", new Date());
    });
  }
  task4.addEventListener("click", go);

  function go() {
    deadline = prompt("Введите дату в формате yyyy-mm-dd", "");
    let date = new Date(deadline);
    if (date < new Date()) {
      alert("Не та дата");
      date = new Date();
    }
    setClock(".timer", date);
  }
});
