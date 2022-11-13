import dynamic from 'next/dynamic';
var QuillEditor = dynamic(function () { return import('./quillEditor'); }, {
    ssr: false,
});
export function Editor(props) {
    return <QuillEditor {...props}/>;
}
