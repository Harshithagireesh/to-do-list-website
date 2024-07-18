document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function displayTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="${task.completed ? 'completed' : ''}">${task.name}</span>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
                <input type="checkbox" class="toggle-btn" ${task.completed ? 'checked' : ''}>
            `;
            taskList.appendChild(li);

            const editBtn = li.querySelector('.edit-btn');
            editBtn.addEventListener('click', function() {
                const newTask = prompt('Edit task:', task.name);
                if (newTask !== null && newTask !== '') {
                    task.name = newTask;
                    saveTasks();
                    displayTasks();
                }
            });

            const deleteBtn = li.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', function() {
                tasks.splice(index, 1);
                saveTasks();
                displayTasks();
            });

            const toggleBtn = li.querySelector('.toggle-btn');
            toggleBtn.addEventListener('change', function() {
                task.completed = toggleBtn.checked;
                saveTasks();
                displayTasks();
            });
        });
    }

    addTaskBtn.addEventListener('click', function() {
        const newTaskName = taskInput.value.trim();
        if (newTaskName !== '') {
            const newTask = {
                name: newTaskName,
                completed: false
            };
            tasks.push(newTask);
            saveTasks();
            displayTasks();
            taskInput.value = '';
        }
    });

    displayTasks();
});
