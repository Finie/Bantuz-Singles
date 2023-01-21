import { MessageType, Theme } from '../../types';
declare const styles: ({ currentUserIsAuthor, message, messageWidth, roundBorder, theme, }: {
    currentUserIsAuthor: boolean;
    message: MessageType.DerivedAny;
    messageWidth: number;
    roundBorder: boolean;
    theme: Theme;
}) => {
    container: {
        alignItems: "flex-end";
        alignSelf: "flex-start" | "flex-end";
        justifyContent: "flex-start" | "flex-end";
        flex: number;
        flexDirection: "row";
        marginBottom: number;
        marginLeft: number;
    };
    contentContainer: {
        backgroundColor: import("react-native").ColorValue;
        borderBottomLeftRadius: number;
        borderBottomRightRadius: number;
        borderColor: string;
        borderRadius: number;
        overflow: "hidden";
    };
    dateHeader: {
        alignItems: "center";
        justifyContent: "center";
        marginBottom: number;
        marginTop: number;
    };
    pressable: {
        maxWidth: number;
    };
};
export default styles;
