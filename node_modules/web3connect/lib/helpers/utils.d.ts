import { IProviderInfo, IInjectedProvidersMap } from "./types";
export declare function checkInjectedProviders(): IInjectedProvidersMap;
export declare function verifyInjectedProvider(check: string): boolean;
export declare function getInjectedProviderName(): string | null;
export declare function getProviderInfoByName(name: string | null): IProviderInfo;
export declare function getProviderInfo(provider: any): IProviderInfo;
export declare function isMobile(): boolean;
export declare function formatProviderDescription(providerInfo: IProviderInfo): string;
//# sourceMappingURL=utils.d.ts.map