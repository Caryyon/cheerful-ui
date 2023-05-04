import { CheerfulProvider } from 'ui'
import { createClient } from 'contentful'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_KEY,
  host: 'preview.contentful.com',
  environment: 'master',
})

const Author = ({ name, picture }) => {
  return (
    <div>
      <h4>{name}</h4>
      <img
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
          width: 75,
          height: 75,
        }}
        src={picture.fields.file.url}
      />
    </div>
  )
}

const components = {
  Author,
}
export default function Web({ sections }) {
  return (
    <CheerfulProvider components={components}>
      <>
        <h1>Title</h1>
        {sections}
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
