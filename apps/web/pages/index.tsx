import { CheerfulProvider } from 'ui'
import { createClient } from 'contentful'
import Image from 'next/image'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_KEY,
  host: 'preview.contentful.com',
  environment: 'master',
})

const Author = ({ name, picture }) => {
  return (
    <div
      style={{
        border: '1px solid black',
        padding: '16px',
        borderRadius: 5,
        display: 'grid',
        gridTemplateColumns: '75px 200px',
        gap: 16,
        width: 300,
      }}
    >
      <Image
        alt={name}
        width={75}
        height={75}
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
          borderRadius: 9999,
        }}
        src={`https:${picture.fields.file.url}`}
      />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h4>{name}</h4>
      </div>
    </div>
  )
}
// an object of Components that will be rendered
// for the coresponding contentful types
const components = {
  Author,
}
const comps = {
  Author: ({ name }) => <h3 style={{ color: 'blue' }}>{name}</h3>,
}
export default function Web({ sections }) {
  return (
    <CheerfulProvider components={components}>
      <>
        <h1>Parent</h1>
        {sections}
        <CheerfulProvider components={comps}>
          <>
            <h1>Child</h1>
            {sections}
          </>
        </CheerfulProvider>
      </>
    </CheerfulProvider>
  )
}

export const getServerSideProps = async (ctx) => {
  const { items: sections } = await client.getEntries()
  return {
    props: {
      sections,
    },
  }
}
