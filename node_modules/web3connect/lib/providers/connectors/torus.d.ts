export interface INetwork {
    nodeUrl: string;
    chainId?: string;
    networkName?: string;
}
interface VerifierStatus {
    google?: boolean;
    facebook?: boolean;
    reddit?: boolean;
    twitch?: boolean;
    discord?: boolean;
}
interface LoginParams {
    verifier?: 'google' | 'facebook' | 'twitch' | 'reddit' | 'discord';
}
export interface IOptions {
    enableLogging?: boolean;
    buttonPosition?: string;
    buildEnv?: string;
    showTorusButton?: boolean;
    enabledVerifiers?: VerifierStatus;
}
export interface ITorusConnectorOptions {
    network?: string | INetwork;
    config?: IOptions;
    loginParams?: LoginParams;
}
declare const ConnectToTorus: (Torus: any, opts: ITorusConnectorOptions) => Promise<unknown>;
export default ConnectToTorus;
//# sourceMappingURL=torus.d.ts.map