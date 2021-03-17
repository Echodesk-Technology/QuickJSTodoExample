import Quick from "quickjs-component"


export default class About extends Quick.Component {
    constructor(params) {
        super(params)
    }
    render() {
        return (
            <div class="con about-con text-center">
                <div className="mt-10 text-center">
                    <quick-router-link to="/" className="mr-3 underline">Home</quick-router-link>
                    <quick-router-link className="text-primary-normal underline active" to="/about">About</quick-router-link>
                </div>
                <div className="logo mt-10 w-10 p-1 max-w-md block ml-auto mr-auto animate-bounce">
                    <img className="quick-logo w-8" src="https://res.cloudinary.com/serveryguken/image/upload/v1615188992/QuickJS/logo/quickjs-logo_wjx3dw.svg" />
                </div>
                <div class="about-page text-center mt-5 text-3xl text-black font-bold">
                    <h1 className="text-5xl p-1 wc-txt">About <span className="text-primary-normal">Quick.js</span> </h1>
                </div>
                <div className="detail p-10 ml-4 mr-4">
                    <h3 className="mt-6">
                       QuickJS is a JavaScript library for building single page server-rendered web applications.
                    </h3>
                    <h3 className="mt-6">
                        QuickJS comes with a custom pre-configured development environment. We save you time building your applications. We take away the hard parts, so you can focus on building applications rather setting up servers and configurations.
                    </h3>
                    <h3 className="mt-6 font-bold">Ecosystem | External links</h3>
                    <ul className="mt-4">
                        <li><quick-router-link to="https://quickjs.org" data-external className="mr-3 underline">Quickjs-component</quick-router-link></li>
                        <li><quick-router-link to="https://quickjs.org" data-external className="mr-3 underline">Quickjs-router</quick-router-link></li>
                        <li><quick-router-link to="https://quickjs.org" data-external className="mr-3 underline">Quickjs-dom</quick-router-link></li>
                    </ul>
                </div>
            </div>
        )
    }

}

