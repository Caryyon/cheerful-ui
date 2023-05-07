import type { ReactElement } from 'react';
import { Node } from '@contentful/rich-text-types';
export declare const embeddedEntry: (components: {
    [key: string]: () => ReactElement;
}) => ({ data }: Node) => JSX.Element | null;
//# sourceMappingURL=embeddedEntry.d.ts.map