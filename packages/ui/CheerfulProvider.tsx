import { createElement, createContext, useContext, useMemo } from 'react'
import type { ReactNode } from 'react'

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

export function CheerfulProvider({
  components,
  children,
  disableParentContext,
}: ICheerfulProvider) {
  let allComponents
  console.log(components)
  console.log(children)
  console.log(disableParentContext)

  if (disableParentContext) {
    allComponents =
      typeof components === 'function'
        ? components({})
        : components || emptyObject
  } else {
    allComponents = useCheerfulComponents(components)
  }

  return createElement(
    CheerfulContext.Provider,
    { value: allComponents },
    children
  )
}
