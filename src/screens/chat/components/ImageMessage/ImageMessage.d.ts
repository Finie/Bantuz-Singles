import { MessageType } from '../../types';
export interface ImageMessageProps {
    message: MessageType.DerivedImage;
    /** Maximum message width */
    messageWidth: number;
}
/** Image message component. Supports different
 * aspect ratios, renders blurred image as a background which is visible
 * if the image is narrow, renders image in form of a file if aspect
 * ratio is very small or very big. */
export declare const ImageMessage: ({ message, messageWidth }: ImageMessageProps) => JSX.Element;
