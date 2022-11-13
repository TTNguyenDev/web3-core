export default LoadingImage;
declare class LoadingImage {
    static create(src: any): any;
    static value(domNode: any): {
        src: any;
        custom: any;
    };
    deleteAt(index: any, length: any): void;
    cache: {} | undefined;
}
declare namespace LoadingImage {
    const blotName: string;
    const className: string;
    const tagName: string;
}
