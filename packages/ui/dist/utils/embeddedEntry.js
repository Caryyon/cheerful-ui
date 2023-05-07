import { jsx as _jsx } from "react/jsx-runtime";
export const embeddedEntry = (components) => ({ data }) => {
    // get contentType as component Name
    const componentName = data.target.sys.contentType.sys.id;
    // capitilize it
    const parsedCompName = `${componentName
        .charAt(0)
        .toUpperCase()}${componentName.slice(1)}`;
    // make it a usable JSX component
    const Component = components[parsedCompName];
    if (!Component)
        return null;
    return _jsx(Component, Object.assign({}, data.target.fields));
};
