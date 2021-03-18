import Quick from "quickjs-component"
import Welcome from "./Welcome";
import List from "./List";


export default class App extends Quick.Component {
    constructor(params) {
        super(params)
    }
    render() {
        return (
            <div className="con mb-14">
                <div className="mt-8 text-center">
                    <quick-router-link to="/" className="mr-3 text-primary-normal underline active">Home</quick-router-link>
                    <quick-router-link to="/about" className="underline">About</quick-router-link>
                </div>
                <div className="logo mt-5 w-10 p-1 max-w-md block ml-auto mr-auto animate-bounce">
                    <img className="quick-logo w-8" src="https://res.cloudinary.com/serveryguken/image/upload/v1615188992/QuickJS/logo/quickjs-logo_wjx3dw.svg" />
                </div>
                <div class="welcome text-center mt-2 text-3xl text-black font-bold">
                    <Welcome name={"Quick.js"} />
                </div>
                <div className="sec mt-6 text-center">
                    <h4>Get g started by editing <span className="bg-snow text-sm font-medium p-2">src/views/App.js</span></h4>
                </div>
                <div className="app-list">
                    <List />
                </div>
            </div>
        )
    }

}

