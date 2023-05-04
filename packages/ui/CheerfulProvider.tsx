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
import { BLOCKS } from '@contentful/rich-text-types'

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

interface ICheerfulProvider {
  components?: unknown
  children?: ReactNode | ReactNode[]
  disableParentContext?: boolean
}
//TODO add types and possibly children???
const embeddedEntry =
  (components) =>
  ({ data }) => {
    const Component = components[data.target.fields.type]
    if (!Component) return null
    return <Component {...data.target.fields} />
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
      return child?.props.children.map((item) => {
        if (item.length) {
          return item.map(({ fields: { content } }) =>
            documentToReactComponents(content, options)
          )
        } else {
          return createElement(item?.type, item?.props, item?.props.children)
        }
      })
    })
  )
}
