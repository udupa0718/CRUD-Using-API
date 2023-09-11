let formId = document.getElementById('update-todo');
let fTodo = document.getElementById('todo');
let fCompleted = document.getElementById('completed');

let URL = 'https://dummyjson.com';

// generating random user id
function genRandId() {
    return Math.floor(Math.random() * 100);
}

// to read query params from the url address
let urlIns = new URLSearchParams(window.location.search); // create instance to read url address
const params = new Proxy(urlIns, {
    get: (searchParams, prop) => searchParams.get(prop)
});

console.log('params todoId =', params.todoId);
console.log('params status =', params.status);


// read single data from server
const readSingle = async (id) => {
    await fetch(`${URL}/todos/${id}`, {
       method: "GET",
       headers: { "Content-Type" : "application/json"}
    }).then(res => res.json())
    .then(res => {
        console.log('todo =', res);
        fTodo.value = res.todo;
        fCompleted.value = res.completed ? "true" : "false";
    }).catch(err => console.log(err.message));
}

// update handler 
formId.addEventListener("submit", async (e) => {
    e.preventDefault();
    let status = fCompleted.value === "true"? true : false;
    let data = {
        todo: fTodo.value,
        completed: status,
        userId: genRandId()
    };
    console.log('updated todo =', data);


// patch request
await fetch(`${URL}/todos/${params.todoId}`,{
    method: "PATCH",
    headers: { "Content-Type" : "application/json"},
    body: JSON.stringify(data)
    }).then(res => res.json())
    .then(res => {
        window.alert("Todo updated successfully");
        window.location.href = "index.html";
    }).catch(err => console.log(err.message));
});

(function () {
    readSingle(params.todoId)
})();

