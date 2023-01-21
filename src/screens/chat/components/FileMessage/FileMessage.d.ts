import { MessageType } from '../../types';
export interface FileMessageProps {
    message: MessageType.DerivedFile;
}
export declare const FileMessage: ({ message }: FileMessageProps) => JSX.Element;
