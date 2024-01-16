interface Props {
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
    children: React.ReactNode | React.ReactNode[];
    className: string;
}

export const Button = ( { onClick, children, className }: Props ) => {

    return (
        <button
            onClick={ onClick }
            className={ className }>
            { children }
        </button>
    );
};
