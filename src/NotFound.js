import {div} from "./aprog.js";

const NotFound = ({ message = "Page Not Found" }) => {
    return div({
        style: style,
        value: [
            div({
                style: style2,
                value: "404"
            }),
            div({value: message})
        ]
    });
}

const style = {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.875rem",
    color: "#c3e4fc",
    backgroundColor: "#043458"
};

const style2 = {
    fontSize: "3rem",
    fontWeight: "bold",
    color: "#ff2800"
}

export default NotFound;
