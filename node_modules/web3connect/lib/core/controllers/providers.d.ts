import { IProviderControllerOptions, IProviderMappingEntry } from "../../helpers/types";
declare class ProviderController {
    cachedProvider: string;
    shouldCacheProvider: boolean;
    private eventController;
    private injectedProvider;
    private providerMapping;
    private providerOptions;
    private network;
    constructor(opts: IProviderControllerOptions);
    shouldDisplayProvider(id: string): boolean;
    getProviders: () => {
        name: string;
        onClick: () => Promise<void>;
    }[];
    getProviderMappingEntry(id: string): IProviderMappingEntry | undefined;
    getProviderOption(id: string, field: string): any;
    clearCachedProvider(): void;
    setCachedProvider(id: string): void;
    connectTo: (id: string, connector: (providerPackage: any, opts: any) => Promise<any>) => Promise<void>;
    connectToCachedProvider(): Promise<void>;
    on(event: string, callback: (result: any) => void): () => void;
    off(event: string, callback?: (result: any) => void): void;
}
export default ProviderController;
//# sourceMappingURL=providers.d.ts.map