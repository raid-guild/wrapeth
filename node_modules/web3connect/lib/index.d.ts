import Button from "./components/ConnectButton";
import Core from "./core";
import * as types from "./helpers/types";
declare const _default: {
    checkInjectedProviders(): types.IInjectedProvidersMap;
    verifyInjectedProvider(check: string): boolean;
    getInjectedProviderName(): string | null;
    getProviderInfoByName(name: string | null): types.IProviderInfo;
    getProviderInfo(provider: any): types.IProviderInfo;
    isMobile(): boolean;
    formatProviderDescription(providerInfo: types.IProviderInfo): string;
    Button: typeof Button;
    Core: typeof Core;
    providers: types.IProviderInfo[];
};
export default _default;
//# sourceMappingURL=index.d.ts.map