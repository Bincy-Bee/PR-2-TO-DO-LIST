const express = require("express");

const app = express();

app.use(express.json());

let initialTodo = [
  { title: "HTML", isCompleted: "true", id: 1 },
  { title: "JavaScript", isCompleted: "true", id: 2 },
  { title: "NodeJs", isCompleted: "false", id: 3 },
  { title: "React", isCompleted: "false", id: 4 },
];

app.get("/", (req, res) => {
  console.log(req);
  res.status(200).send("Welcome to todo api");
});


//togo api GET Method
app.get("/todos", (req, res)=>{
    console.log(req);
    res.status(200).send(initialTodo);
})

//todo api POSt Method
app.post("/addtodo", (req, res)=>{

    console.log(req.body);

    let newtodo = {
        title : req.body.title,
        isCompleted : req.body.isCompleted,
        id : initialTodo.length +1
    }
    initialTodo.push(newtodo);
    res.status(200).send(newtodo);
});

//todo api PATCH Method

app.patch("/update/:id",(req, res)=>{
    console.log(req.params.id);
    let {id} = req.params;

    // let updated = initialTodo.filter(todo => todo.id == id)

    let index = initialTodo.findIndex((todos) => todos.id == id)
    console.log(index);
    if (index == -1){
        res.status(404).send("Todo list is not found")
    }
    else{
        initialTodo[index].title = req.body.title;
        initialTodo[index].isCompleted = req.body.isCompleted;
        
        console.log(initialTodo[index])
    }
    res.status(200).send(initialTodo[index])
})

//todo api DELETE Method

app.delete("/delete/:id", (req, res)=>{

    let {id} = req.params;
    let index = initialTodo.findIndex((todos) => todos.id == id);
    console.log(index);
    if(index == -1){
        res.status(404).send("Todo not found")
    }
    else{
        let deletetodo = initialTodo.splice(index, 1)[0];
        console.log(deletetodo)
    }

    res.send(deletetodo);
    // let deletedTodo = initialTodo.filter((todos) => todos.id == id);
    // console.log(...deletedTodo)
    
    // res.send({deletedTodo : deletetodo, todos:deletedTodo})
    // res.send(...deletedTodo)
    
})

//Single todo

app.get("/todo/:id", (req, res)=>{
     let {id} = req.params;
     console.log(id);
     let td = initialTodo.filter((todos) => todos.id == id)
     console.log(td);
     res.status(200).send(td);
})

//filter

app.get("/findbystatus", (req, res)=>{
    console.log(req.query);
    let {isCompleted} = req.query;
    let filters = initialTodo.filter((todos) => todos.isCompleted == isCompleted);
    res.status(200).send(filters);
})

const port = 8090;
app.listen(port, () => {
  console.log(`Server is runnig on port : http://localhost:${port}`);
});
