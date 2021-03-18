// Quick needs to be imported to use jsx
import Quick from "quickjs-component";


const Welcome = ({ name }) => {
    return (
        <h1 className= "text-5xl p-1 wc-txt" >Welcome to < span className = "text-primary-normal" > { name }! </span></h1>
    )
}

export default Welcome
