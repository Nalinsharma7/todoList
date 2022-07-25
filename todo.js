(function(){
        
    let tasks = [];
    var count = 0;
    const tasksList = document.getElementById('list');
    const addTaskInput = document.getElementById('add');
    const tasksCounter = document.getElementById('tasks-counter');

    // console.log('Working');

    async function fetchTodos(){
        //  fetch('https://jsonplaceholder.typicode.com/todos')
        //     .then(function(response){
        //         // console.log(response);
        //         return response.json();
        //     }).then(function(data){
        //         // console.log(data);
        //         tasks = data.slice(0,10);
        //         renderList();
        //     })
        //     .catch(function(error){
        //         console.log('error',error);
        //     })
        try{
            const response = await fetch('https://jsonplaceholder.typicode.com/todos');
            const data = await response.json();
            tasks = data.slice(0,12);
            renderList();
        } catch(error){
            console.log(error);
        }

    }

    function addTaskToDOM(task){
        const li = document.createElement('li');

        li.innerHTML = `
            <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''} class="custom-checkbox">
            <label for="${task.id}">${task.title}</label>
            <img src="bin.jpg" class="delete" data-id="${task.id}" />
        `;

        tasksList.append(li);

    }

    function renderList () {
        tasksList.innerHTML = '';
        for (let i=0 ; i < tasks.length; i++){
            addTaskToDOM(tasks[i]);
        }

        tasksCounter.innerHTML = tasks.length;
    }

    function toggleTask (taskId) {
        const task = tasks.filter(function(task){
            return task.id === Number(taskId);
        });

        if (task.length > 0){
            const currTask = task[0];

            currTask.completed = !currTask.completed;
            renderList();
            showNotification('Task toggled successfully');
            return;
        }

        showNotification('Task could not be toggled');
    }

    function deleteTask (taskId) {
        const newTasks = tasks.filter(function(task){
            return task.id !== Number(taskId);
        })

        tasks = newTasks;
        renderList();
        showNotification('Task deleted successfully');
        return;
    }

    function addTask (task) {
        if(task){
            // fetch('https://jsonplaceholder.typicode.com/todos',{
            //     method:'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(task),
            // }).then(function(response){
            //         // console.log(response);
            //     return response.json();
            // }).then(function(data){
            //     console.log(data);
            //     tasks.push(task);
            //     renderList();
            //     showNotification('Task added successfully!');
                
            // })
            // .catch(function(error){
            //     console.log('error',error);
            // })
            tasks.push(task);
            renderList();
            showNotification('Task added successfully!');
            return;
        }

        showNotification('Task cannot be added');
    }

    function showNotification(text) {
        alert(text)
    }

    // console.log('Working!')


    function handleInputKeypress(e){
        if (e.key=='Enter'){
            const text = e.target.value;
            // console.log('text', text);
            
            if (!text){
                showNotification('Task text cannot be empty')
            }

            const task ={
                title: text,
                id: Date.now(),
                completed:false
            }

            e.target.value = '';
            addTask(task);



        }

        
    }

    function HandleClickListener(e){
        const target = e.target;
        // console.log(target);

        if (target.className == 'delete'){
            const taskId = target.dataset.id;
            deleteTask(taskId);
            return;

        } else if (target.className == 'custom-checkbox'){
            const taskId = target.id;
            toggleTask(taskId);
            return;


        }
    }


    function InitialiseApp(){
        fetchTodos();
        addTaskInput.addEventListener('keyup',handleInputKeypress);
        document.addEventListener('click',HandleClickListener);
    }

    InitialiseApp();


})();



