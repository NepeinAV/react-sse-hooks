var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ImplementationNotExists = /** @class */ (function (_super) {
    __extends(ImplementationNotExists, _super);
    function ImplementationNotExists(message) {
        var _this = _super.call(this) || this;
        _this.message = message || 'Your environment doesn\'t have EventSource implementation. Please, provide your own via "eventSource" prop.';
        return _this;
    }
    return ImplementationNotExists;
}(Error));
export default ImplementationNotExists;
