let formId = document.getElementById('create-todo');
let fTodo = document.getElementById('todo');
let fCompleted = document.getElementById('completed');

let URL = 'https://dummyjson.com';

// generating random user id
function genRandId() {
     return Math.floor(Math.random() * 100);
};

// form submit handler function
formId.addEventListener('submit', async (event) => {
    event.preventDefault(); // to avoid page refresh

    let data = {
        todo: fTodo.value,
        completed: fCompleted.value,
        userId: genRandId()
    };
    console.log('new todo =', data);

    await fetch(`${URL}/todos/add`, {
       method: "POST",
       headers: { "Content-Type": "application/json"},
       body: JSON.stringify(data)
    }).then(res => res.json())
      .then(res => {
        alert("New Todo Data added successfully");
        window.location.href = "index.html";
       }).catch(err=> alert(err.message))
});