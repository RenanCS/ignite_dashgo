import Link from "next/link"
import { useRouter } from "next/router"
import { cloneElement } from "react"
import { ActiveLinkProps } from "./interface"


export const ActiveLink: React.FC<ActiveLinkProps> = ({ children, shouldMatchExactHref = false, ...rest }) => {
    const { asPath } = useRouter();

    const isMatchRoute = shouldMatchExactHref && (asPath === rest.href || asPath === rest.as);
    const isSubRoute = !shouldMatchExactHref && (asPath.startsWith(String(rest.href)) || asPath.startsWith(String(rest.href)))

    const isActive = isMatchRoute || isSubRoute;

    return (
        <Link {...rest}>
            {cloneElement(children, { color: isActive ? 'pink.400' : 'gray.50' })}
        </Link>
    )
}