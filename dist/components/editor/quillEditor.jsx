var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React from 'react';
import classes from './editor.module.css';
import { useQuillEditor } from './useQuillEditor';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
export var QuillEditor = function (props) {
    var id = props.id, isMiniMode = props.isMiniMode, refInsertImage = props.refInsertImage, refInsertVideo = props.refInsertVideo, refInsertNFT = props.refInsertNFT, defaultValue = props.defaultValue;
    var _a = useQuillEditor(props), _b = _a.props, quill = _b.quill, quillRef = _b.quillRef, _c = _a.methods;
    var rootClassName = props.mode === 'create_post'
        ? [classes['root'], classes['create-post']].join(' ')
        : classes['root'];
    return (<div className={rootClassName} style={__assign({}, props.style)}>
            <div id={id}>
                {!isMiniMode && (<>
                        <button className="ql-header" value="1"/>
                        <button className="ql-header" value="2"/>
                        <select className="ql-size">
                            <option value="small"/>
                            <option selected/>
                            <option value="large"/>
                            <option value="huge"/>
                        </select>
                        {/* <select className="ql-font">
                <option value="sans-serif" selected>
                    Sans Serif
                </option>
                <option value="monospace">Monospace</option>
            </select> */}
                    </>)}
                <button className="ql-bold"/>
                <button className="ql-italic"/>
                <button className="ql-underline"/>
                <button className="ql-list" value="ordered"/>
                <button className="ql-list" value="bullet"/>
                <select className="ql-align">
                    <option label="left" selected/>
                    <option label="center" value="center"/>
                    <option label="right" value="right"/>
                    <option label="justify" value="justify"/>
                </select>
                <button className="ql-code-block"/>
                <button className="ql-link"/>
                <button className="ql-image" ref={refInsertImage}/>
                <button className="ql-video" ref={refInsertVideo}/>
            </div>
            {props.headElement}
            <div ref={quillRef}/>
        </div>);
};
export default QuillEditor;
