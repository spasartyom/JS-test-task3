const app = () => {
  // задачи добавлены по умолчанию, для демонстрации фильтрации, так как в условии не было сказано про возможность смены статуса у задач
  const state = {
    screen: 'first',
    addProcess: {
      submitDisabled: true,
    },
    filterStatus: 'all',
    openedTasks: [{ name: "345667", text: "hekll", status: "opened" }],
    todoTasks: [{ name: "Test Task 3", text: "ToDo List", status: "todo" }, { name: "Test Task 0", text: "ToDo List", status: "todo" }],
    doneTasks: [{ name: "Test Task 2", text: "Форма", status: "done" }, { name: "Test Task 1", text: "Рефакторинг", status: "done" }],
  };

  const btnAddTask = document.querySelector('#addTask');
  btnAddTask.addEventListener('click', () => {
    state.screen = 'second';
    render(state);
  });

  // поздно увидел про удаление, не успел реализовать
  // handleDelete не работает
  // UPDATE: повесил обработчик на таблицу, удаление происходит по названию, предполагается, что название задачи уникально.
  const tasksTable = document.querySelector('#tasks');
  tasksTable.addEventListener('click', (e) => {
    const name = e.target.textContent;
    // console.log(name);
    state.todoTasks = state.todoTasks.filter((task) => task.name !== name);
    state.openedTasks = state.openedTasks.filter((task) => task.name !== name);
    state.doneTasks = state.doneTasks.filter((task) => task.name !== name);
    render(state);
  }, true);

  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    state.screen = 'first';
    const data = new FormData(e.target);
    const taskName = data.get('taskName');
    const taskText = data.get('taskText');
    const newTask = {
      name: taskName,
      text: taskText,
      status: 'opened'
    };
    state.openedTasks = [newTask, ...state.openedTasks];
    render(state);
  });

  const taskName = document.querySelector('#taskName');
  taskName.addEventListener('input', ({ target }) => {
    const name = target.value;
    if (name) {
      state.addProcess.submitDisabled = false;
    } else {
      state.addProcess.submitDisabled = true;
    }
    render(state);
  });
  render(state);

  const filters = document.querySelectorAll('input[name=statusTasks');
  [...filters].forEach((item) => {
    item.addEventListener('input', (e) => {
      state.filterStatus = e.target.value;
      render(state);
    });
  });

};

const render = (state) => {
  const firstScreen = document.querySelector('#first');
  const secondScreen = document.querySelector('#second');
  if (state.screen === 'first') {
    firstScreen.style.display = 'block';
    secondScreen.style.display = 'none';
    const tasksTable = document.querySelector('#tasks');
    const openedTasks = state.openedTasks.map((task) => `<tr class="opened"><td>${task.name}</td><td>${task.text}</td><td>${task.status}</td></tr>`).join('');
    const todoTasks = state.todoTasks.map((task) => `<tr class="todo"><td>${task.name}</td><td>${task.text}</td><td>${task.status}</td></tr>`).join('');
    const doneTasks = state.doneTasks.map((task) => `<tr class="done"><td>${task.name}</td><td>${task.text}</td><td>${task.status}</td></tr>`).join('');
    if (state.filterStatus === 'opened') {
      tasksTable.innerHTML = `${openedTasks}`;
    }
    if (state.filterStatus === 'todo') {
      tasksTable.innerHTML = `${todoTasks}`;
    }
    if (state.filterStatus === 'done') {
      tasksTable.innerHTML = `${doneTasks}`;
    }
    if (state.filterStatus === 'all') {
      tasksTable.innerHTML = `${openedTasks}${todoTasks}${doneTasks}`;
    }
  }
  if (state.screen === 'second') {
    firstScreen.style.display = 'none';
    secondScreen.style.display = 'block';
    const submitInput = document.querySelector('input[type=submit]');
    if (state.addProcess.submitDisabled) {
      submitInput.setAttribute('disabled', true);
    } else {
      submitInput.removeAttribute('disabled');
    }
  }
};

app();