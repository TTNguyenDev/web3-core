import { useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import ImageUploader from '../../utils/quill/quill.imageUploader';
// @ts-ignore
import MagicUrl from 'quill-magic-url';
export var useQuillEditor = function (props) {
    var id = props.id, placeholder = props.placeholder, onChange = props.onChange, customRef = props.customRef, refQuill = props.refQuill, defaultValue = props.defaultValue;
    var modules = {
        toolbar: "#".concat(id),
        clipboard: {
            matchVisual: false,
        },
        magicUrl: true,
    };
    var formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'video',
    ];
    useEffect(function () {
        var Quill = require('quill');
        Quill.register('modules/imageUploader', ImageUploader);
        Quill.register('modules/magicUrl', MagicUrl);
    }, []);
    var _a = useQuill({
        theme: 'bubble',
        modules: modules,
        formats: formats,
        placeholder: placeholder,
    }), quill = _a.quill, quillRef = _a.quillRef;
    useEffect(function () {
        if (quill) {
            quill.on('text-change', function (delta, oldDelta, source) {
                onChange(quill.root.innerHTML);
            });
            if (customRef) {
                customRef.current.clearContent = function () {
                    quill.root.innerHTML = '';
                };
            }
            if (refQuill)
                refQuill.current = quill;
            if (defaultValue)
                quill.root.innerHTML = defaultValue;
        }
    }, [quill]);
    return {
        props: {
            quill: quill,
            quillRef: quillRef,
        },
        methods: {},
    };
};
