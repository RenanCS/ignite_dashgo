import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { destroyCookie, parseCookies } from "nookies";
import { AuthTokenError } from "src/services/errors/AuthTokenError";
import { Library } from "./readOnly";

export function withSSRAuth<T>(fn: GetServerSideProps<T>): GetServerSideProps {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<T>> => {
        const cookies = parseCookies(ctx);
        const hasToken = cookies[Library.DASHGOTOKEN];

        if (!hasToken) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false
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