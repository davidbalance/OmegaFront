import { EeqLogo } from './EeqLogo'
import { IpegesLogo } from './IpegesLogo'
import { OmegaLogo } from './OmegaLogo'

export * from './EeqLogo'
export * from './IpegesLogo'
export * from './OmegaLogo'

export const SystemLogo: Record<string, React.ElementType> = {
    omega: OmegaLogo,
    eeq: EeqLogo,
    ipeges: IpegesLogo
}