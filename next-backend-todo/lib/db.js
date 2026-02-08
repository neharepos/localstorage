let todos = [];
let idCounter = 1;

export function getTodos(){
    return todos;
}

export function addTodo(text){
    const newTodo = {
        id: idCounter++,
        text,
        complete: false,
    };

    todos.push(newTodo);
    return newTodo;
}

export function updateTodo(id, data) {
    const todo = todos.find(t => t.id === id);
    if(!todo) return null;

    Object.assign(todo, data);
    return todo;
}

export function deleteTodo(id){
    const index = todos.findIndex(t=> t.id == id)
    if (index === -1)
        return false;

    todos.splice(index, 1);
    return true;
}