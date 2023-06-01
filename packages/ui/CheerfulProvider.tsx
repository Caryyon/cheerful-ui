import {
  createElement,
  createContext,
  useContext,
  useMemo,
  Children,
} from 'react'
import type { ReactNode } from 'react'
import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer'
import { BLOCKS, Document } from '@contentful/rich-text-types'
import { embeddedEntry } from './utils/embeddedEntry'

export const CheerfulContext = createContext({})

export function useCheerfulComponents(components: any) {
  const contextComponents = useContext(CheerfulContext)
  // Memoize to avoid unnecessary top-level context changes
  return useMemo(() => {
    // Custom merge via a function prop
    if (typeof components === 'function') {
      return components(contextComponents)
    }

    return { ...contextComponents, ...components }
  }, [contextComponents, components])
}

const emptyObject = {}

export interface ICheerfulProvider {
  components?: unknown
  sections?: any[]
  children?: ReactNode | ReactNode[]
  disableParentContext?: boolean
}

export function CheerfulProvider({
  components,
  children,
  disableParentContext = false,
}: ICheerfulProvider) {
  let allComponents

  if (disableParentContext) {
    allComponents =
      typeof components === 'function'
        ? components({})
        : components || emptyObject
  } else {
    allComponents = useCheerfulComponents(components)
  }

  //TODO: allow a configuration for this to end user
  const options: Options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ENTRY]: embeddedEntry(allComponents),
    },
  }
  return createElement(
    CheerfulContext.Provider,
    { value: allComponents },
    Children.map(children, (child) => {
      //TODO make the proper checks
      //@ts-ignore
      return child?.props.children.map((item) => {
        if (item.length) {
          return item.map(
            ({ fields: { content } }: { fields: { content: Document } }) =>
              documentToReactComponents(content, options)
          )
        }
        return createElement(item?.type, item?.props, item?.props.children)
      })
    })
  )
}
