import { EeqLogo } from './EeqLogo'
import { IpegesLogo } from './IpegesLogo'
import { OmegaLogo } from './OmegaLogo'

export * from './EeqLogo'
export * from './IpegesLogo'
export * from './OmegaLogo'

const logos = {
    omega: OmegaLogo,
    eeq: EeqLogo,
    ipeges: IpegesLogo
}

export function systemLogo(key: string): any {
    return Object.keys(logos).includes(key) ? logos[key as keyof typeof logos] : logos.omega;
}