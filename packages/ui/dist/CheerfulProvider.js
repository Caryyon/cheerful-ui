import { createElement, createContext, useContext, useMemo, Children, } from 'react';
import { documentToReactComponents, } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { embeddedEntry } from './utils/embeddedEntry';
export const CheerfulContext = createContext({});
export function useCheerfulComponents(components) {
    const contextComponents = useContext(CheerfulContext);
    // Memoize to avoid unnecessary top-level context changes
    return useMemo(() => {
        // Custom merge via a function prop
        if (typeof components === 'function') {
            return components(contextComponents);
        }
        return Object.assign(Object.assign({}, contextComponents), components);
    }, [contextComponents, components]);
}
const emptyObject = {};
export function CheerfulProvider({ components, children, disableParentContext = false, }) {
    let allComponents;
    if (disableParentContext) {
        allComponents =
            typeof components === 'function'
                ? components({})
                : components || emptyObject;
    }
    else {
        allComponents = useCheerfulComponents(components);
    }
    //TODO: allow a configuration for this to end user
    const options = {
        renderNode: {
            [BLOCKS.EMBEDDED_ENTRY]: embeddedEntry(allComponents),
        },
    };
    return createElement(CheerfulContext.Provider, { value: allComponents }, Children.map(children, (child) => {
        //TODO make the proper checks
        //@ts-ignore
        return child === null || child === void 0 ? void 0 : child.props.children.map((item) => {
            if (item.length) {
                return item.map(({ fields: { content } }) => documentToReactComponents(content, options));
            }
            return createElement(item === null || item === void 0 ? void 0 : item.type, item === null || item === void 0 ? void 0 : item.props, item === null || item === void 0 ? void 0 : item.props.children);
        });
    }));
}
