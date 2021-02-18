const loader = {
    template: '<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>',

};
const todo = new Vue({
    el: "#main",

    data: {
        task: "",
        todoList: [],
        editInput: '',
        loading: false
    },
    components: {
        loader
    },
    methods: {
        addTodo() {
           this.todoList.unshift({
               id: this.todoList.length + 1,
               title: this.task,
               done: false,
               edit: false
           })
           this.task = "" 
        },
        removeTodo(index){
            this.todoList.splice(index, 1)
        },
        fetch(){
            this.loading = true;
            fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
            .then(response => response.json())
            .then(json => this.todoList=json.map(elem => {
                return {
                    ...elem,
                    done: false,
                    edit: false
                }
            }))
            this.loading = false;
        },
        doneTodo(index){
            this.todoList[index].done = !this.todoList[index].done;
        },
        editButton(index){
            this.todoList[index].edit = !this.todoList[index].edit;
            if(this.todoList[index].edit){
                this.editInput = this.todoList[index].title;
            }
            if (this.todoList[index].edit === false) {
                this.editInput = "";
            }
        },
        editTodo(index){
            this.todoList[index].title = this.editInput;
            this.editButton(index);
        },
    },
    mounted() {
        this.fetch()
    },
})

