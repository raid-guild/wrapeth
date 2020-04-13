import * as React from "react";
import * as PropTypes from "prop-types";
import { SimpleFunction, IProviderCallback } from "../helpers/types";
declare global {
    interface Window {
        ethereum: any;
        web3: any;
        updateWeb3ConnectModal: any;
    }
}
interface IModalProps {
    providers: IProviderCallback[];
    onClose: SimpleFunction;
    resetState: SimpleFunction;
    lightboxOpacity: number;
}
interface IModalState {
    show: boolean;
    lightboxOffset: number;
}
declare class Modal extends React.Component<IModalProps, IModalState> {
    constructor(props: IModalProps);
    static propTypes: {
        providers: PropTypes.Validator<object>;
        onClose: PropTypes.Validator<(...args: any[]) => any>;
        resetState: PropTypes.Validator<(...args: any[]) => any>;
        lightboxOpacity: PropTypes.Validator<number>;
    };
    lightboxRef?: HTMLDivElement | null;
    mainModalCard?: HTMLDivElement | null;
    state: IModalState;
    componentDidUpdate(prevProps: IModalProps, prevState: IModalState): void;
    render: () => JSX.Element;
}
export default Modal;
//# sourceMappingURL=Modal.d.ts.map