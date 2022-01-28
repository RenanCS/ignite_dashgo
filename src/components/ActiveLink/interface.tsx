import { LinkProps } from 'next/link';
import { ReactElement } from 'react';

export interface ActiveLinkProps extends LinkProps {
    isActive: boolean;
    children: ReactElement;
    shouldMatchExactHref: boolean;
}