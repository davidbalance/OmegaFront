import omega from "@/lib/api-client/omega-client/omega";

type HealthCheck = { health: string }
export const healthCheck = async (): Promise<HealthCheck> => {
    const data: HealthCheck = await omega()
        .execute('medicalResultUpload');
    return data;
}