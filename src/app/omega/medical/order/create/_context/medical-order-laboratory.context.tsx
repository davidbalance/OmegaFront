'use client'

import { createContext, useContext, useState } from "react";

export type LaboratoryValue = {
  examType: string;
  examSubtype: string;
  examName: string;
}

interface MedicalOrderLaboratoryContextProp {
  exams: LaboratoryValue[]
  add: (value: LaboratoryValue) => void;
  remove: (index: number) => void;
}

const MedicalOrderLaboratoryContext = createContext<MedicalOrderLaboratoryContextProp | undefined>(undefined);

export const useMedicalOrderLaboratory = () => {
  const context = useContext(MedicalOrderLaboratoryContext);
  if (!context) {
    throw new Error('useOmegaShell must be used within a OmegaShellProvider');
  }
  return context;
}

interface MedicalOrderLaboratoryProviderProps {
  children: React.ReactNode,
  initial?: LaboratoryValue[]
}
const MedicalOrderLaboratoryProvider: React.FC<MedicalOrderLaboratoryProviderProps> = ({
  children,
  initial,
}) => {

  const [exams, setExams] = useState<LaboratoryValue[]>(initial ?? []);

  const add = (value: LaboratoryValue) => setExams(prev => [...prev, value]);
  const remove = (index: number) => setExams(prev => prev.filter((_, i) => index !== i));

  return (
    <MedicalOrderLaboratoryContext.Provider value={{ exams, add, remove }}>
      {children}
    </MedicalOrderLaboratoryContext.Provider>
  )
}

export default MedicalOrderLaboratoryProvider