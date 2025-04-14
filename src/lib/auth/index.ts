import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { getServerSession, Session } from "next-auth";
import authOptions from "./auth.options";

async function auth(...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []): Promise<Session> {
    const session = await getServerSession(...args, authOptions);
    if (!session) throw new Error('Unable to use session.');
    return session;
}

export default auth;