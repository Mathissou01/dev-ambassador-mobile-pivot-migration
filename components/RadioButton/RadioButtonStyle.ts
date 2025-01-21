import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
        container: {
            display: "flex",
            flexDirection: "row",
            gap: 15,
            alignItems: "center",
        },
        radio: {
            position: "relative",
            borderWidth: 1,
            height: 20,
            width: 20,
            borderRadius: 10,
        },
        radioSelected: {
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "80%",
            height: "80%",
            borderWidth: 0,
            transform: "translate(-50%, -50%)",
        }
    }
);

export default styles;
