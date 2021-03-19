import Quick from "quickjs-component";

export default class NotFound extends Quick.Component {
    constructor() {
        super()
    }
    render() {
        return (
            <div className="text-center mt-60">
                <div>
                    <h1 className="text-3xl font-bold">Not Found</h1>
                </div>
                <div className="">
                    <quick-router-link to="/" className="mr-3 underline">Home</quick-router-link>
                </div>
            </div>
        )

    }
}
