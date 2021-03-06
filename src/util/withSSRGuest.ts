import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies } from "nookies";
import { Library } from "./readOnly";

export function withSSRGuest<T>(fn: GetServerSideProps<T>): GetServerSideProps {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<T>> => {
        const cookies = parseCookies(ctx);
        const hasToken = cookies[Library.DASHGOTOKEN];

        if (hasToken) {
            return {
                redirect: {
                    destination: '/users',
                    permanent: false
                }
            }
        }

        return await fn(ctx);
    }
}