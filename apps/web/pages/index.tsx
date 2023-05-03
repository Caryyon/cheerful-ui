import { CheerfulProvider } from 'ui'

const components = {
  heading_1: () => <h1>yup</h1>,
}

export default function Web() {
  return (
    <CheerfulProvider components={components}>
      <h1>Web</h1>
    </CheerfulProvider>
  )
}
