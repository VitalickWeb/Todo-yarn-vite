import React, {ButtonHTMLAttributes, FC} from 'react';

export type ButtonType = {
    title: string
    onClick: () => void
    className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonType> =
    ({
         title,
         onClick,
         className,
         ...props
     }) => {

        const onClickAddTaskHandler = () => {
            onClick()
        }

        return (
            <button
                className={className}
                onClick={onClickAddTaskHandler}
                {...props}
            >
                {title}
            </button>
        );
    };

