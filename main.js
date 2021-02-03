const todo = new Vue({
    el: "#main",
    data: {
        task: "",
        todoList: []
    },
    methods: {
        addTodo() {
           this.todoList.unshift({
               id: this.todoList.length + 1,
               title: this.task,
               done: false
           })
           this.task = "" 
        },
        removeTodo(index){
            this.todoList.splice(index, 1)
        },
        fetch(){
            fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(json => this.todoList=json.map(elem => {
                return {
                    ...elem,
                    done: false
                }
            }))
        },
        doneTodo(index){
            this.todoList[index].done = !this.todoList[index].done;
        }
    },
    mounted() {
        this.fetch()
    },
})
