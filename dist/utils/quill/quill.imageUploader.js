import LoadingImage from './blots/image.js';
var ImageUploader = /** @class */ (function () {
    function ImageUploader(quill, options) {
        this.quill = quill;
        this.options = options;
        this.range = null;
        if (typeof this.options.upload !== 'function')
            console.warn('[Missing config] upload function that returns a promise is required');
        var toolbar = this.quill.getModule('toolbar');
        toolbar.addHandler('image', this.selectLocalImage.bind(this));
        this.handleDrop = this.handleDrop.bind(this);
        this.handlePaste = this.handlePaste.bind(this);
        this.quill.root.addEventListener('drop', this.handleDrop, false);
        this.quill.root.addEventListener('paste', this.handlePaste, false);
    }
    ImageUploader.prototype.selectLocalImage = function () {
        var _this = this;
        this.range = this.quill.getSelection();
        this.fileHolder = document.createElement('input');
        this.fileHolder.setAttribute('type', 'file');
        this.fileHolder.setAttribute('accept', 'image/*');
        this.fileHolder.setAttribute('style', 'visibility:hidden');
        this.fileHolder.onchange = this.fileChanged.bind(this);
        document.body.appendChild(this.fileHolder);
        this.fileHolder.click();
        window.requestAnimationFrame(function () {
            document.body.removeChild(_this.fileHolder);
        });
    };
    ImageUploader.prototype.handleDrop = function (evt) {
        var _this = this;
        evt.stopPropagation();
        evt.preventDefault();
        if (evt.dataTransfer &&
            evt.dataTransfer.files &&
            evt.dataTransfer.files.length) {
            if (document.caretRangeFromPoint) {
                var selection = document.getSelection();
                var range = document.caretRangeFromPoint(evt.clientX, evt.clientY);
                if (selection && range) {
                    selection.setBaseAndExtent(range.startContainer, range.startOffset, range.startContainer, range.startOffset);
                }
            }
            else {
                var selection = document.getSelection();
                var range = document.caretPositionFromPoint(evt.clientX, evt.clientY);
                if (selection && range) {
                    selection.setBaseAndExtent(range.offsetNode, range.offset, range.offsetNode, range.offset);
                }
            }
            this.range = this.quill.getSelection();
            var file_1 = evt.dataTransfer.files[0];
            setTimeout(function () {
                _this.range = _this.quill.getSelection();
                _this.readAndUploadFile(file_1);
            }, 0);
        }
    };
    ImageUploader.prototype.handlePaste = function (evt) {
        var _this = this;
        var clipboard = evt.clipboardData || window.clipboardData;
        // IE 11 is .files other browsers are .items
        if (clipboard && (clipboard.items || clipboard.files)) {
            var items = clipboard.items || clipboard.files;
            var IMAGE_MIME_REGEX = /^image\/(jpe?g|gif|png|svg|webp)$/i;
            var _loop_1 = function (i) {
                if (IMAGE_MIME_REGEX.test(items[i].type)) {
                    var file_2 = items[i].getAsFile
                        ? items[i].getAsFile()
                        : items[i];
                    if (file_2) {
                        this_1.range = this_1.quill.getSelection();
                        evt.preventDefault();
                        setTimeout(function () {
                            _this.range = _this.quill.getSelection();
                            _this.readAndUploadFile(file_2);
                        }, 0);
                    }
                }
            };
            var this_1 = this;
            for (var i = 0; i < items.length; i++) {
                _loop_1(i);
            }
        }
    };
    ImageUploader.prototype.readAndUploadFile = function (file) {
        var _this = this;
        var isUploadReject = false;
        var fileReader = new FileReader();
        fileReader.addEventListener('load', function () {
            if (!isUploadReject) {
                var base64ImageSrc = fileReader.result;
                _this.insertBase64Image(base64ImageSrc);
            }
        }, false);
        if (file) {
            fileReader.readAsDataURL(file);
        }
        this.options.upload(file).then(function (imageUrl) {
            _this.insertToEditor(imageUrl);
        }, function (error) {
            isUploadReject = true;
            _this.removeBase64Image();
            console.warn(error);
        });
    };
    ImageUploader.prototype.fileChanged = function () {
        var file = this.fileHolder.files[0];
        this.readAndUploadFile(file);
    };
    ImageUploader.prototype.insertBase64Image = function (url) {
        var range = this.range;
        this.quill.insertEmbed(range.index, LoadingImage.blotName, "".concat(url), 'user');
    };
    ImageUploader.prototype.insertToEditor = function (url) {
        var range = this.range;
        // Delete the placeholder image
        this.quill.deleteText(range.index, 3, 'user');
        // Insert the server saved image
        this.quill.insertEmbed(range.index, 'image', "".concat(url), 'user');
        range.index++;
        this.quill.setSelection(range, 'user');
    };
    ImageUploader.prototype.removeBase64Image = function () {
        var range = this.range;
        this.quill.deleteText(range.index, 3, 'user');
    };
    return ImageUploader;
}());
window.ImageUploader = ImageUploader;
export default ImageUploader;
