export default ImageUploader;
declare class ImageUploader {
    constructor(quill: any, options: any);
    quill: any;
    options: any;
    range: any;
    handleDrop(evt: any): void;
    handlePaste(evt: any): void;
    selectLocalImage(): void;
    fileHolder: HTMLInputElement | undefined;
    readAndUploadFile(file: any): void;
    fileChanged(): void;
    insertBase64Image(url: any): void;
    insertToEditor(url: any): void;
    removeBase64Image(): void;
}
