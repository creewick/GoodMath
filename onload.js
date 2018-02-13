var data;
$.get('./data.json', (context) => {
    data = context;
    let checkboxes = $('[name=tag]');
    let total = 0;
    for (let i = 0; i < checkboxes.length; i++){
        let checkbox = checkboxes[i];
        let count = 0;
        let sheets = filter(data);
        let tasks = getTasks(sheets);
        for (let j = 0; j < tasks.length; j++)
            if (tasks[j].From.Tag === checkbox.value) {
                count++;
                total++;
            }
        checkbox.parentElement.innerHTML += `(${count})`;
    }
    $('h1')[0].innerText += ` (${total})`;
});
