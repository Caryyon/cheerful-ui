import type { ReactNode } from 'react';
export declare const CheerfulContext: import("react").Context<{}>;
export declare function useCheerfulComponents(components: any): any;
export interface ICheerfulProvider {
    components?: unknown;
    children?: ReactNode | ReactNode[];
    disableParentContext?: boolean;
}
export declare function CheerfulProvider({ components, children, disableParentContext, }: ICheerfulProvider): import("react").FunctionComponentElement<import("react").ProviderProps<{}>>;
//# sourceMappingURL=CheerfulProvider.d.ts.map