export interface IArkaneConnectorOptions {
    clientId: string;
    nodeUrl?: string;
    environment?: string;
}
declare const ConnectToArkane: (Arkane: any, opts: IArkaneConnectorOptions) => Promise<unknown>;
export default ConnectToArkane;
//# sourceMappingURL=arkane.d.ts.map