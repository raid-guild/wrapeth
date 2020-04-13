export interface IWalletConnectConnectorOptions {
    infuraId: string;
    bridge?: string;
    qrcode?: boolean;
    network?: string;
}
declare const ConnectToWalletConnect: (WalletConnectProvider: any, opts: IWalletConnectConnectorOptions) => Promise<unknown>;
export default ConnectToWalletConnect;
//# sourceMappingURL=walletconnect.d.ts.map