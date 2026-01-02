import { DM_Sans, Bricolage_Grotesque } from "next/font/google";


export const dmSans = DM_Sans({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    display: 'swap'

})

export const bricolageGrotesque = Bricolage_Grotesque({
    subsets: ['latin'],
    weight: ['700'],
    variable: '--bricolage',
    display: 'swap'
})