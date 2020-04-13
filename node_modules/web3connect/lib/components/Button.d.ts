import * as React from "react";
interface IButtonStyleProps {
    disabled: boolean;
    icon?: any;
}
interface IButtonProps extends IButtonStyleProps {
    children: React.ReactNode;
    onClick?: any;
    className?: string;
}
declare const Button: {
    (props: IButtonProps): JSX.Element;
    defaultProps: {
        disabled: boolean;
        icon: null;
    };
};
export default Button;
//# sourceMappingURL=Button.d.ts.map