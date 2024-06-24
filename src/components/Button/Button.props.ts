import { ReactNode } from 'react';

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
    children: ReactNode;
    appearance?: 'large' | 'small';
}
