import Quick from "quickjs-component";
import TodosList from "./TodosList";


export default class Todo extends Quick.Component {
    constructor(params) {
        super(params)
    }
    render() {
        return (
            <div className="con mb-14">
                <h1 className="text-3xl text-center text-yellow-600 mt-20 font-bold">Todos</h1>
                <TodosList />
            </div>
        )
    }

}