import { BiologicalRisk, ChemicalRisk, ErgonomicRisk, MechanicalRisk, PhysicalRisk, PsychosocialRisk } from "@/server/record/create-record/_base"

export const optionsPhysical: PhysicalRisk<string> & { physicalRiskOther: string } = {
    physicalRiskHighTemperature: "TEMPERATURAS ALTAS",
    physicalRiskLowTemperature: "TEMPERATURAS BAJAS",
    physicalRiskIonicRadiation: "RADIACION IONIZANTE",
    physicalRiskNonIonicRadiation: "RADIACION NO IONIZANTE",
    physicalRiskNoise: "RUIDO",
    physicalRiskVibration: "VIBRACION",
    physicalRiskIllumination: "ILUMINACION",
    physicalRiskVentilation: "VENTILACION",
    physicalRiskElectricFluid: "FLUIDO ELECTRICO",
    physicalRiskOther: "OTRAS",
}

export const optionsMechanical: MechanicalRisk<string> & { mechanicRiskOther: string } = {
    mechanicRiskEntrapmentBetweenMachines: "ATRAPAMIENTO ENTRE MAQUINAS",
    mechanicRiskTrappingBetweenSurfaces: "ATRAPAMIENTO ENTRE SUPERFICIES",
    mechanicRiskEntrapmentBetweenObjects: "ATRAPAMIENTO ENTRE OBJETOS",
    mechanicRiskObjectFalling: "CAIDAS DE OBJETOS",
    mechanicRiskSameLevelFalling: "CAIDAS AL MISMO NIVEL",
    mechanicRiskDifferentLevelFalling: "CAIDAS A DIFERENTE NIVEL",
    mechanicRiskElectricContact: "CONTACTO ELECTRICO",
    mechanicRiskSurfacesContact: "CONTACTO ENTRE SUPERFICIES",
    mechanicRiskParticlesProjection: "PROYECCION DE PARTICULAS - FRAGMENTOS",
    mechanicRiskFluidProjection: "PROYECCION DE FLUIDOS",
    mechanicRiskJab: "PINCHAZOS",
    mechanicRiskCut: "CORTES",
    mechanicRiskHitByVehicles: "ATROPELLAMIENTO POR VEHICULOS",
    mechanicRiskVehicleCollision: "CHOQUE / COLLISION VEHICULAR",
    mechanicRiskOther: "OTRAS"
}

export const optionsChemical: ChemicalRisk<string> & { chemicalRiskOther: string } = {
    chemicalRiskSolid: "SOLIDO",
    chemicalRiskDust: "POLVOS",
    chemicalRiskSmoke: "HUMOS",
    chemicalRiskLiquid: "LIQUIDOS",
    chemicalRiskSteam: "VAPORES",
    chemicalRiskAerosol: "AEROSOLES",
    chemicalRiskMist: "NEBLINAS",
    chemicalRiskGas: "GASEOSAS",
    chemicalRiskOther: "OTRAS"
}

export const optionsBiological: BiologicalRisk<string> & { biologicalRiskOther: string } = {
    biologicalRiskVirus: "VIRUS",
    biologicalRiskFungus: "HONGOS",
    biologicalRiskBacteria: "BACTERIAS",
    biologicalRiskParasites: "PARASITOS",
    biologicalRiskExposureToVectors: "EXPOSICION A VECTORES",
    biologicalRiskExposureToWildlifeAnimals: "EXPOSICION A ANIMALES SELVATICOS",
    biologicalRiskOther: "OTRAS"
}

export const optionsErgonomic: ErgonomicRisk<string> & { ergonomicRiskOther: string } = {
    ergonomicRiskManualHandlingLoads: "MANEJO MANUAL DE CARGAS",
    ergonomicRiskRepetitiveMoves: "MOVIMIENTO REPETITIVOS",
    ergonomicRiskForcedPostures: "POSTURAS FORZADAS",
    ergonomicRiskWorkWithPvd: "TRABAJOS CON PVD",
    ergonomicRiskOther: "OTRAS"
}

export const optionsPsychosocial: PsychosocialRisk<string> & { psychosocialRiskOther: string } = {
    psychosocialRiskMonotony: "MONOTONIA DEL TRABAJO",
    psychosocialRiskWorkOverload: "SOBRECARGA LABORAL",
    psychosocialRiskThoroughnessOfTheTask: "MINUSCIOSIDAD DE LA TAREA",
    psychosocialRiskHighResponsibility: "ALTA RESPONSABILIDAD",
    psychosocialRiskTakingResponsibilityAutonomy: "AUTONOMIA EN LA TOMA DE DECISIONES",
    psychosocialRiskSupervision: "SUPERVICION Y ESTILOS DE DIRECCION DEFICIENTE",
    psychosocialRiskRoleConflict: "CONFLICTO DE ROL",
    psychosocialRiskNonFunctionClarify: "FALTA DE CLARIDAD EN LAS FUNCIONES",
    psychosocialRiskBadWorkDistribution: "INCORRECTA DISTRIBUCION DEL TRABAJO",
    psychosocialRiskRotativeShift: "TURNOS ROTATIVOS",
    psychosocialRiskIntrapersonalRelations: "RELACIONES INTERPERSONALES",
    psychosocialRiskJobInstability: "INESTABILIDAD PERSONAL",
    psychosocialRiskOther: "OTRAS"
}