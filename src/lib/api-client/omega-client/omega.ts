import OmegaClientBase from "./omega-client-base"

const omega = (): OmegaClientBase => {
    if (typeof window !== 'undefined') {
        throw new Error('OmegaClientBase can only be instantiated on the server.');
    }
    const apikey = process.env.NEXT_PUBLIC_API_KEY;
    if (!apikey) throw new Error('Backend api key is required');
    const omegaClient = new OmegaClientBase(process.env.NEXT_PUBLIC_ROOT_API || '', apikey);
    return omegaClient;
}

export default omega;