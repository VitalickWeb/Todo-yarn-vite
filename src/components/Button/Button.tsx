import React, {ButtonHTMLAttributes, FC} from 'react';

export type ButtonType = {
    title: string
    onClick: () => void
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonType> =
    ({
         title,
         onClick,
         ...props
     }) => {

        const onClickAddTaskHandler = () => {
            onClick()
        }

        return (
            <button
                className="button_item"
                onClick={onClickAddTaskHandler}
                {...props}
            >
                {title}
            </button>
        );
    };

