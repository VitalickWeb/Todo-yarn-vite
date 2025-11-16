import React, {ButtonHTMLAttributes, FC} from 'react';

export type ButtonType = {
    title: string
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonType> =
    ({
         title,
         ...props
     }) => {

        return (
            <button
                className="button_item"
                {...props}
            >
                {title}
            </button>
        );
    };

