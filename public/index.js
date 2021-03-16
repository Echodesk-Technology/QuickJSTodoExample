import Quick from "quickjs-component";
import routes from "../src/router/routes";
import config from "../quick.config";

if(config.mode === "production") {
   setTimeout(() => {
    document.getElementsByTagName("script")[1].remove();
    console.error = function(){}
   },0)
}