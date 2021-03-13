import Quick from "quickjs-component";

export default class NotFound extends Quick.Component{
    constructor() {
        super()
    }
    render() {
        return  (
            <div>
                 <div class="about-page text-center mt-10 text-3xl text-black font-bold">
                    <h1 className="text-5xl p-1 wc-txt">404 <span className="text-primary-normal">NOT FOUND</span> </h1>
                </div>
                <div className="mt-10 text-center">
                    <quick-router-link to="/" className="mr-3 underline">Home</quick-router-link>
                    <quick-router-link className="text-primary-normal underline active" to="/about">About</quick-router-link>
                </div>
            </div>
        )

    }
}
