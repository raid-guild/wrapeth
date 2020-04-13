import { ICoreOptions } from "../helpers/types";
declare class Core {
    private show;
    private eventController;
    private lightboxOpacity;
    private providerController;
    private providers;
    constructor(opts?: Partial<ICoreOptions>);
    readonly cachedProvider: string;
    clearCachedProvider(): void;
    setCachedProvider(id: string): void;
    on(event: string, callback: (result: any) => void): () => void;
    off(event: string, callback?: (result: any) => void): void;
    toggleModal: () => Promise<void>;
    connect: () => Promise<unknown>;
    connectTo: (id: string) => Promise<unknown>;
    renderModal(): void;
    private _toggleModal;
    private onError;
    private onConnect;
    private onClose;
    private updateState;
    private resetState;
}
export default Core;
//# sourceMappingURL=index.d.ts.map