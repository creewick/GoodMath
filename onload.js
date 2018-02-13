var data;
$.get('./data.json', (context) => {
    data = context;
    let checkboxes = $('[name=tag]');
    let total = 0;
    let tasks = getTasks(context);
    let counters = [];
    for (let i = 0; i < checkboxes.length; i++)
        counters[i] = 0;
    for (let j = 0; j < tasks.length; j++)
        for (let i = 0; i < checkboxes.length; i++)
            if (tasks[j].From.Tag === checkboxes[i].value) {
                counters[i]++;
                total++;
            }
    for (let i = 0; i < checkboxes.length; i++)
        checkboxes[i].parentElement.innerHTML += `(${counters[i]})`;
    $('h1')[0].innerText += ` (${total})`;
});
