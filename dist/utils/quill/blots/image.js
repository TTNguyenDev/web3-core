var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import Quill from 'quill';
var InlineBlot = Quill.import('blots/block');
var LoadingImage = /** @class */ (function (_super) {
    __extends(LoadingImage, _super);
    function LoadingImage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoadingImage.create = function (src) {
        var node = _super.create.call(this, src);
        if (src === true)
            return node;
        var image = document.createElement('img');
        image.setAttribute('src', src);
        node.appendChild(image);
        return node;
    };
    LoadingImage.prototype.deleteAt = function (index, length) {
        _super.prototype.deleteAt.call(this, index, length);
        this.cache = {};
    };
    LoadingImage.value = function (domNode) {
        var _a = domNode.dataset, src = _a.src, custom = _a.custom;
        return { src: src, custom: custom };
    };
    return LoadingImage;
}(InlineBlot));
LoadingImage.blotName = 'imageBlot';
LoadingImage.className = 'image-uploading';
LoadingImage.tagName = 'span';
Quill.register({ 'formats/imageBlot': LoadingImage });
export default LoadingImage;
