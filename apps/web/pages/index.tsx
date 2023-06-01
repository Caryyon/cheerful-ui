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
        border: '2px solid #2d3436',
        backgroundColor: '#a29bfe',
        padding: 16,
        borderRadius: 5,
        display: 'grid',
        gridTemplateColumns: '75px 125px',
        gap: 16,
        width: 300,
        fontFamily: 'sans-serif',
        color: '#55efc4'
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
          border: '4px solid #55efc4'
        }}
        src={`https:${picture.fields.file.url}`}
      />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h3>{name}</h3>
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
