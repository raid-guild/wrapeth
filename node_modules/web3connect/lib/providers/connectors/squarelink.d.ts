export interface INetwork {
    nodeUrl: string;
    chainId?: string;
}
export interface IOptions {
    scope?: string[];
}
export interface ISquarelinkConnectorOptions {
    id: string;
    network?: string | INetwork;
    config?: IOptions;
}
declare const ConnectToSquarelink: (Squarelink: any, opts: ISquarelinkConnectorOptions) => Promise<unknown>;
export default ConnectToSquarelink;
//# sourceMappingURL=squarelink.d.ts.map