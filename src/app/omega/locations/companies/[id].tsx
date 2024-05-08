'use client'

import { useRouter } from 'next/router'

export default function Page() {
  const router = useRouter()
  return <p>Post: {router.query.id}</p>
}

// import React, { useState } from "react"
// import { CompanyLayout } from "@/components/company/company-layout/CompanyLayout"
// import { useCompany } from "@/hooks"
// import { useRouter } from "next/router"

// enum LayoutStates {
//     DEFAULT
// }

// const Company: React.FC = () => {

//     const router = useRouter()

//     console.log(router.query.slug);

//     const companyHook = useCompany();

//     const [currentState, setCurrentState] = useState<LayoutStates>(LayoutStates.DEFAULT);

//     const handleClose = (group: string) => {
//         companyHook.clearSelected();
//         companyHook.find(group);
//         setCurrentState(LayoutStates.DEFAULT);
//     }

//     const view: Record<LayoutStates, React.ReactNode> = {
//         [LayoutStates.DEFAULT]:
//                 <CompanyLayout
//                     load={companyHook.loading}
//                     companies={companyHook.companies}
//                 />
//     }

//     return <>
//         {
//             view[currentState]
//         }
//     </>

// }

// export default Company