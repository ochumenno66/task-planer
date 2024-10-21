//получаем необходимые элементы DOM
const taskInput = document.getElementById("input");
const addButton = document.getElementById("button");
const taskList = document.getElementById("taskList");
const clearButton = document.getElementById("clearButton");

loadTasks();

//Делаем проверку на заполненность input
function updateTaskList() {
  if (taskList.children.length === 0) {
    const noMessage = document.createElement("li");
    noMessage.textContent = "Задачи отсутствуют:(";
    noMessage.classList.add("noMessage");
    taskList.appendChild(noMessage);
    clearButton.disabled = true;
  } else {
    clearButton.disabled = false;
    const noMessage = taskList.querySelector(".noMessage");
    if (noMessage) {
      taskList.removeChild(noMessage);
    }
  }
}

//Добавляем задачи
function addTask() {
  const task = taskInput.value.trim();

  if (task) {
    createTaskElement(task);
    taskInput.value = "";
    saveTasks();
    updateTaskList();
  }
}
addButton.addEventListener("click", addTask);

function createTaskElement(task) {
  const listItem = document.createElement("li");
  listItem.textContent = task;

  //Создаем чекбокс
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("custom-checkbox");

  //Добавляем чекбокс к списку
  listItem.appendChild(checkbox);
  taskList.appendChild(listItem);
}

function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll("li").forEach(function (item) {
    tasks.push({ text: item.textContent.trim() });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    createTaskElement(task.text);
    const listItem = taskList.lastChild;
    if (listItem) {
      const checkbox = listItem.querySelector("input[type='checkbox']");
      checkbox.checked = task.completed;
    }
  });
  updateTaskList();
}

//Очищаем задачи
clearButton.addEventListener("click", () => {
  taskList.innerHTML = "";
  localStorage.removeItem("tasks");
  updateTaskList();
});

updateTaskList();

/*-В приложении должен быть input для ввода текста задачи и 
кнопка для её добавления в «Список задач»

-Ниже должен быть «Список задач» и кнопка «Очистить список»

-Когда задач нет, должно быть серое уведомление о том, что 
задачи отсутствуют, а кнопка «Очистить список» должна быть неактивна

-При добавлении задачи в список, каждая из них должна появляться в 
списке задач и напротив иметь неактивный чекбокс, а кнопка 
«Очистить список» должна быть активна

-Каждый чекбокс напротив задачи должен менять своё состояние при клике 
(говоря нам, что задача выполнена)

-При клике на кнопку «Очистить список» все задачи должны удаляться

Важно: Для сохранения состояния списка задач между сеансами работы 
с приложением используйте Local Storage. Это позволит восстановить 
список задач при повторном открытии приложения.*/
