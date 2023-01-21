import { ImageRequireSource, ImageURISource } from 'react-native';
interface Props {
    imageIndex: number;
    images: Array<ImageURISource | ImageRequireSource>;
    onRequestClose: () => void;
    visible: boolean;
}
declare const ImageView: (_: Props) => JSX.Element;
export default ImageView;
