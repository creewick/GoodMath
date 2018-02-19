function act(){
    document.getElementById('submit').value = 'Поиск...';
    let sheets = filter(data);
    let tasks = getTasks(sheets);
    console.log(tasks);
    getRandomTasks(tasks, 10);
    document.getElementById('submit').value = 'Подобрать задачи';
}

function getRandomTasks(tasks, count){
    let div = document.getElementById('result');
    div.innerHTML = '';
    for (let i = 0; i < count; i++){
        if (tasks.length === 0)
            return;
        addRandomTask(tasks, div);
    }
    if (tasks.length > 0)
        addMoreButton(tasks, div);
}

function addMoreButton(tasks, div){
    let more = document.createElement('button');
    more.innerText = 'Показать ещё';
    more.onclick = () => {
        getRandomTasks(tasks, 10);
    };
    div.appendChild(document.createElement('hr'));
    div.appendChild(more);
}

function addRandomTask(tasks, div){
    let task = document.createElement('div');
    let index = randomInt(0, tasks.length - 1);
    task.innerHTML = addTitle(tasks[index]);
    task.innerHTML += `<br>${tasks[index].Task}<br><br>`;
    if (tasks[index].Image !== undefined)
        task.innerHTML += `<div align="center"><img src="${tasks[index].Image}"></div>`;
    if ((tasks[index].Answer !== undefined || tasks[index].AnswerImage !== undefined)
         && tasks[index].Checked === true) {
        let answerLabel = document.createElement('div');
        answerLabel.value = tasks[index].Answer;
        answerLabel.image = tasks[index].AnswerImage;
        answerLabel.innerHTML += '<b>Показать ответ</b>';
        answerLabel.onclick = () => {
            if (answerLabel.value === undefined)
                answerLabel.value = '';
            answerLabel.innerHTML = `<b>Ответ: ${answerLabel.value}</b>`;
            if (answerLabel.image !== undefined)
                answerLabel.innerHTML += `<div align="center"><img src="${answerLabel.image}"></div>`;
        };
        task.appendChild(answerLabel);
    }
    tasks.splice(index, 1);
    div.appendChild(task);
}

function addTitle(task){
    let title = '<hr>';
    title += `<b>Задача из: </b>${task.From.Title}<br>`;
    title += `<b>По теме: </b>${task.From.Tag}<br>`;
    title += `<b>От: </b>${task.From.Date}<br>`;
    title += `<b>Для: </b>${task.From.Level} класса<br>`;
    return title;
}

function randomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getTasks(sheets){
    let tasks = [];
    let answerFlag = $('[name=solved]:checked').length > 0;
    for (let i = 0; i < sheets.length; i++)
        for (let j = 0; j < sheets[i].Tasks.length; j++)
            if (!answerFlag || sheets[i].Tasks[j].Checked) {
                let task = sheets[i].Tasks[j];
                task.From = sheets[i];
                tasks.push(task);
            }
    return tasks;
}

function filter(data){
    data = filterByTags(data);
    data = filterByDate(data);
    data = filterByLevel(data);
    return data;
}
function filterByTags(data){
    let result = [];
    let allTags = $('[name=tag]');
    let checkedObjects = $('[name=tag]:checked');
    let checkedValues = [];
    for (let i = 0; i < checkedObjects.length; i++)
        checkedValues.push(checkedObjects[i].value);
    for (let i = 0; i < data.length; i++){
        let sheet = data[i];
        if (checkedValues.includes(sheet.Tag))
            result.push(sheet);
    }
    return result;
}

function filterByDate(data){
    let result = [];
    let startString = document.getElementById('startDate').value;
    let endString = document.getElementById('endDate').value;
    let startDate = new Date(startString);
    if (startString === '')
        startDate = new Date('0001-01-01');
    let endDate = new Date(endString);
    if (endString === '')
        endDate = new Date('3000-01-01');
    for (let i = 0; i < data.length; i++){
        let sheet = data[i];
        let currentDate = new Date(sheet.Date);
        if (startDate <= currentDate && currentDate <= endDate)
            result.push(sheet);
    }
    return result;
}

function filterByLevel(data){
    let result = [];
    let levelObjects = $("option:selected");
    let levelValues = [];
    for (let i = 0; i < levelObjects.length; i++)
        levelValues.push(levelObjects[i].value);
    for (let i = 0; i < data.length; i++){
        let sheet = data[i];
        if (levelValues[0] <= sheet.Level && sheet.Level <= levelValues[1])
            result.push(sheet);
    }
    return result;
}