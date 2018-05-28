/* global $ */
$(document).ready(function() {
    $.getJSON('/api/todo')
        .then(function(todos) {
            todos.forEach(function(todo) {
                addTodo(todo);
            });
        })
        .catch(function(err) {
            console.log(err);
        });
});

function addTodo(todo) {
    var newTodo = $('<li class="task">' + todo.name + '</li>');
    if (todo.completed) {
        newTodo.addClass('done');
    }
    $('.list').append(newTodo);
}