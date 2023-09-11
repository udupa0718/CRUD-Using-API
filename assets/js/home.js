let todoList = document.getElementById("todoList");

let URL = "https://dummyjson.com";


// path?query = value
let readAllTodo = async () => {
    await fetch (`${URL}/todos?limit=120`)
    .then(res => res.json())
    .then(res => {
        console.log('todo list =', res);
        printData(res.todos)
    }).catch(err => console.error(err.message))
};

// delete handler 
const deleteTodo = async (id) => {
    if(window.confirm(`Are you sure to delete todo id ${id}?`)) {
        await fetch(`${URL}/todos/${id}`,{
           method: "DELETE",
           headers: { "Content-Type" : "application/json" }
        }).then(res => res.json())
      .then(res => {
          window.alert("todo deleted successfully");
          // window.location.reload();
        }).catch(err => console.log(err.message));
    } else {
      console.log('delete terminated');
    }
};

// print data
const printData = (todo) => {
  todo.forEach((item) => {
    todoList.innerHTML += `<div class="card-container">
                              <article class="card">
                                    <div class="card-title">
                                      <h3> ${item.id}  ${item.todo} </h3>
                                    </div>
                                    <div class="card-body">
                                      <p> Status = ${ item.completed ? `<strong class="success">Completed</strong>` : `<strong class="danger">Not Completed </strong>`} </p>
                                    </div>
                                    <div class="card-footer">
                                      <a href="update.html?todoId=${item.id} & status=${item.completed}" class="btn btn-green">Update</a>
                                      <a onclick="deleteTodo(${item.id})" class="btn btn-red">Delete</a>
                                    </div>
                                </article>
                            </div>`;
    })
};

// anonymous function / self trigger
(function(){
    readAllTodo()
})();