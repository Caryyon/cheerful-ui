import { CheerfulProvider } from 'ui';
import { createClient } from 'contentful';
import Image from 'next/image';
// only for demo this would live somewhere shared
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_KEY,
  host: 'preview.contentful.com',
  environment: 'master',
});
// would live in a shared component library
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
  );
};

// an object of Components that will be rendered
// for the coresponding contentful types
const components = {
  Author,
};
// minimal and basic next page setup
export default function Web({ sections }) {
  return <CheerfulProvider components={components} sections={sections} />;
}
// fetchest data
export const getServerSideProps = async () => {
  const { items: sections } = await client.getEntries();
  return {
    props: {
      sections,
    },
  };
};
