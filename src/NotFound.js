import {div} from "./general.js";

const NotFound = ({ colors = {
    numberColor: "#ff2800",
    textColor: "#c3e4fc",
    backgroundColor: "#043458",
}, message = "Page Not Found" }) => {
    return div({
        style: {
            ...style,
            color: colors.textColor,
            backgroundColor: colors.backgroundColor
        },
        value: [
            div({
                style: {
                    ...style2,
                    color: colors.numberColor
                },
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
    fontSize: "1.875rem"
};

const style2 = {
    fontSize: "3rem",
    fontWeight: "bold"
}

export default NotFound;
