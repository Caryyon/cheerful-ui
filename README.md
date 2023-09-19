# Cheerful-ui

An idea that can make your time working with Contentful cheerful. Through
providers, semantic components, and semantic Contentful content models, one is able
to find ease in building dynamic pages.

### How does it work?

Cheerful-ui at it's core is a `provider` that maps content model data to react components.

### Installation

`npm i @cheerful-ui/ui`

### Usage

```ts
import { CheerfulProvider } from '@cheerful-ui/ui'
import { Button, Link, Card, Hero, Planning } from 'your/design/system/here'

// these component names should directly match their content model counter part in Contentful
const components = [
    Button,
    Link,
    Card,
    Hero,
    // if you have old content models that aren't as semantic as you may have wanted
    someOddlyNamedContentModel: Planning
]

// sections are coming from Contentful
export default function Page({sections}) {
    // just constructing a config
    const config = {
        components,
        sections
    }
  return <CheerfulProvider {...config} />
}

```

With the provided code the provider will map over the sections provided and leverage the `documentToReactComponents` function
that Contentful offers. It will then for any `Embedded Entry` reference the `components` array for a pair. if one is found,
it will use the component when rendering the page. if not it will simply not render anything as `cheerful-ui` has a strict
component one to one comparison for the ease of filtering embedded entries.

TODO: add a fallback to basic html element tags
TODO: add user passed down Options for `documentToReactComponents`

