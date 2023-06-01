import { createElement, createContext, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';
import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer';
import { BLOCKS, Document, Node } from '@contentful/rich-text-types';
import { embeddedEntry } from './utils/embeddedEntry';

export const CheerfulContext = createContext({});

export function useCheerfulComponents(components: any) {
  const contextComponents = useContext(CheerfulContext);
  // Memoize to avoid unnecessary top-level context changes
  return useMemo(() => {
    // Custom merge via a function prop
    if (typeof components === 'function') {
      return components(contextComponents);
    }

    return { ...contextComponents, ...components };
  }, [contextComponents, components]);
}

const emptyObject = {};

export interface ICheerfulProvider {
  components?: unknown;
  sections: any;
  children?: ReactNode;
  disableParentContext?: boolean;
}

export interface Section {
  fields: {
    content: Document
  }
  sys: unknown
  metadata: unknown
}

export function CheerfulProvider({
  components,
  sections,
  children, //TODO handle a way to pass in children and apply parent styles
  disableParentContext = false,
}: ICheerfulProvider) {
  let allComponents;

  if (disableParentContext) {
    allComponents =
      typeof components === 'function'
        ? components({})
        : components || emptyObject;
  } else {
    allComponents = useCheerfulComponents(components);
  }

  //TODO: allow a configuration for this to end user
  const options: Options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ENTRY]: embeddedEntry(allComponents),
    },
  };
  return createElement(
    CheerfulContext.Provider,
    { value: allComponents },
    sections.map(
      ({ fields: { content } }: Section) => {
        return documentToReactComponents(content, options);
      }
    )
  );
}
