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

    $('#todoInput').keypress(function(event) {
        if (event.which == 13) {
            createTodo();
        }
    });

    $('.list').on('click', 'span', function(e) {
        e.stopPropagation();
        removeTodo($(this).parent());
    });

    $('.list').on('click', 'li', function() {
        updateTodo($(this));
    });
});

function removeTodo(todo) {
    var clickedId = todo.data('id');
    var deletedUrl = '/api/todo/' + clickedId;
    $.ajax({
            method: 'DELETE',
            url: deletedUrl
        })
        .then(function(data) {
            todo.remove();
        })
        .catch(function(err) {
            console.log(err);
        });
}

function createTodo() {
    var userInput = $('#todoInput').val();
    //send request to create new todo
    $.post('/api/todo', { name: userInput })
        .then(function(newTodo) {
            addTodo(newTodo);
            $('#todoInput').val('');
        })
        .catch(function(err) {
            console.log(err);
        });
}

function addTodo(todo) {
    var newTodo = $('<li class="task">' + todo.name + '<span>X</span></li>');
    newTodo.data('id', todo._id);
    newTodo.data('completed', todo.completed);
    if (todo.completed) {
        newTodo.addClass('done');
    }
    $('.list').append(newTodo);
}

function updateTodo(todo) {
    var isDone = !todo.data('completed');
    var clickedId = todo.data('id');
    var upadteData = { completed: isDone };
    var updateUrl = '/api/todo/' + clickedId;
    $.ajax({
            method: 'PUT',
            url: updateUrl,
            data: upadteData
        })
        .then(function() {
            todo.toggleClass("done");
            todo.data('completed', isDone);
        })
        .catch(function(err) {
            console.log(err);
        });
}