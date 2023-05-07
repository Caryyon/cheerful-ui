"use strict";
exports.__esModule = true;
exports.embeddedEntry = void 0;
var embeddedEntry = function (components) {
    return function (_a) {
        var data = _a.data;
        // get contentType as component Name
        var componentName = data.target.sys.contentType.sys.id;
        // capitilize it
        var parsedCompName = "".concat(componentName
            .charAt(0)
            .toUpperCase()).concat(componentName.slice(1));
        // make it a usable JSX component
        var Component = components[parsedCompName];
        if (!Component)
            return null;
        return <Component {...data.target.fields}/>;
    };
};
exports.embeddedEntry = embeddedEntry;
