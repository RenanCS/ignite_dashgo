import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { destroyCookie, parseCookies } from "nookies";
import { AuthTokenError } from "src/services/errors/AuthTokenError";
import { Library } from "./readOnly";
import decode from 'jwt-decode';
import { validateUserPermissions } from "./validateUserPermissions";
import { UserCredencials } from "src/contexts/AuthContext/interface";

type WithsSRAuthOptions = {
    permissions?: string[],
    roles?: string[]
}

export function withSSRAuth<T>(fn: GetServerSideProps<T>, options?: WithsSRAuthOptions): GetServerSideProps {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<T>> => {
        const cookies = parseCookies(ctx);
        const token = cookies[Library.DASHGOTOKEN];

        if (!token) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
        }

        if (options) {
            const userAuthenticated: UserCredencials = decode(token);
            const { permissions, roles } = options;
            const user = { permissions: userAuthenticated?.permissions, roles: userAuthenticated?.roles };
            const userHasValidPermissions = validateUserPermissions({ user, permissions, roles });

            if (!userHasValidPermissions) {
                return {
                    redirect: {
                        destination: '/users',
                        permanent: false
                    }
                }
            }
        }


        try {
            return await fn(ctx);
        } catch (err) {
            if (err instanceof AuthTokenError) {
                destroyCookie(ctx, Library.DASHGOTOKEN);
                destroyCookie(ctx, Library.DASHGOREFRESHTOKEN);

                return {
                    redirect: {
                        destination: '/',
                        permanent: false
                    }
                }
            }
        }

    }
}