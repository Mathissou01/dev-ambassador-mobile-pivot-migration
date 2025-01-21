import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
        container: {
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
            gap: 15
        },
        item: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 15,
            paddingRight: 7
        }
    }
);

export default styles;
