import { BiologicalRisk, ChemicalRisk, ErgonomicRisk, MechanicalRisk, PhysicalRisk, PsychosocialRisk } from "@/server/record/create-record/_base"

export const optionsPhysical: PhysicalRisk<string> & { physicalRiskOther: string } = {
    physicalRiskHighTemperature: "Temperaturas altas",
    physicalRiskLowTemperature: "Temperaturas bajas",
    physicalRiskIonicRadiation: "Radiación ionizante",
    physicalRiskNonIonicRadiation: "Radiación no ionizante",
    physicalRiskNoise: "Ruido",
    physicalRiskVibration: "Vibración",
    physicalRiskIllumination: "Iluminación",
    physicalRiskVentilation: "Ventilación",
    physicalRiskElectricFluid: "Fluido eléctrico",
    physicalRiskOther: "Otras",
}

export const optionsMechanical: MechanicalRisk<string> & { mechanicRiskOther: string } = {
    mechanicRiskEntrapmentBetweenMachines: "Atrapamiento entre máquinas",
    mechanicRiskTrappingBetweenSurfaces: "Atrapamiento entre superficies",
    mechanicRiskEntrapmentBetweenObjects: "Atrapamiento entre objetos",
    mechanicRiskObjectFalling: "Caídas de objetos",
    mechanicRiskSameLevelFalling: "Caídas al mismo nivel",
    mechanicRiskDifferentLevelFalling: "Caídas a diferente nivel",
    mechanicRiskElectricContact: "Contacto eléctrico",
    mechanicRiskSurfacesContact: "Contacto entre superficies",
    mechanicRiskParticlesProjection: "Proyección de partículas / fragmentos",
    mechanicRiskFluidProjection: "Proyección de fluidos",
    mechanicRiskJab: "Pinchazos",
    mechanicRiskCut: "Cortes",
    mechanicRiskHitByVehicles: "Atropellamiento por vehículos",
    mechanicRiskVehicleCollision: "Choque / colisión vehicular",
    mechanicRiskOther: "Otras"
}

export const optionsChemical: ChemicalRisk<string> & { chemicalRiskOther: string } = {
    chemicalRiskSolid: "Sólidos",
    chemicalRiskDust: "Polvos",
    chemicalRiskSmoke: "Humos",
    chemicalRiskLiquid: "Líquidos",
    chemicalRiskSteam: "Vapores",
    chemicalRiskAerosol: "Aerosoles",
    chemicalRiskMist: "Neblinas",
    chemicalRiskGas: "Gaseosos",
    chemicalRiskOther: "Otras"
}

export const optionsBiological: BiologicalRisk<string> & { biologicalRiskOther: string } = {
    biologicalRiskVirus: "Virus",
    biologicalRiskFungus: "Hongos",
    biologicalRiskBacteria: "Bacterias",
    biologicalRiskParasites: "Parásitos",
    biologicalRiskExposureToVectors: "Exposición a vectores",
    biologicalRiskExposureToWildlifeAnimals: "Exposición a animales silvestres",
    biologicalRiskOther: "Otras"
}

export const optionsErgonomic: ErgonomicRisk<string> & { ergonomicRiskOther: string } = {
    ergonomicRiskManualHandlingLoads: "Manejo manual de cargas",
    ergonomicRiskRepetitiveMoves: "Movimientos repetitivos",
    ergonomicRiskForcedPostures: "Posturas forzadas",
    ergonomicRiskWorkWithPvd: "Trabajos con PVD",
    ergonomicRiskOther: "Otras"
}

export const optionsPsychosocial: PsychosocialRisk<string> & { psychosocialRiskOther: string } = {
    psychosocialRiskMonotony: "Monotonía del trabajo",
    psychosocialRiskWorkOverload: "Sobrecarga laboral",
    psychosocialRiskThoroughnessOfTheTask: "Minuciosidad de la tarea",
    psychosocialRiskHighResponsibility: "Alta responsabilidad",
    psychosocialRiskTakingResponsibilityAutonomy: "Autonomía en la toma de decisiones",
    psychosocialRiskSupervision: "Supervisión y estilos de dirección deficientes",
    psychosocialRiskRoleConflict: "Conflicto de rol",
    psychosocialRiskNonFunctionClarify: "Falta de claridad en las funciones",
    psychosocialRiskBadWorkDistribution: "Incorrecta distribución del trabajo",
    psychosocialRiskRotativeShift: "Turnos rotativos",
    psychosocialRiskIntrapersonalRelations: "Relaciones interpersonales",
    psychosocialRiskJobInstability: "Inestabilidad personal",
    psychosocialRiskOther: "Otras"
}