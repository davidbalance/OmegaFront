import { removeFromTempSource, retriveFromTempSource, storeInTempSource } from "./db-store/db-store.utils";
import { RemoveFromTmpStoreDelegate, RetriveFromTmpStoreDelegate, StoreInTmpStoreDelegate } from "./tmp-store.types";

export const retriveFromTmpStore: RetriveFromTmpStoreDelegate = retriveFromTempSource;
export const storeInTmpStore: StoreInTmpStoreDelegate = storeInTempSource;
export const removeFromTmpStore: RemoveFromTmpStoreDelegate = removeFromTempSource;