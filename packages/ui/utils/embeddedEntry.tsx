import type { ReactElement } from 'react'
import { Node } from '@contentful/rich-text-types'

export const embeddedEntry =
  (components: { [key: string]: () => ReactElement }) =>
  ({ data }: Node) => {
    // get contentType as component Name
    const componentName = data.target.sys.contentType.sys.id
    // capitilize it
    const parsedCompName = `${componentName
      .charAt(0)
      .toUpperCase()}${componentName.slice(1)}`
    // make it a usable JSX component
    const Component = components[parsedCompName]
    if (!Component) return null
    return <Component {...data.target.fields} />
  }
