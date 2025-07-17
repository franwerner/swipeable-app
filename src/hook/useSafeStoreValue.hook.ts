import { StoreApi, UseBoundStore } from "zustand";


/**
 * Este hook lo que hace es asegurar que los datos de la store sean los correctos.
 * Da un error a nivel de aplicacion, pero justamente no deberia pasar si el flujo de la obtencion de los datos es correcto.
 */

export function useSafeStoreValue<T, V>(
    store: UseBoundStore<StoreApi<T>>,
    selector: (state: T) => V,
) {
    const value = store(selector)

    if (value === undefined) {
        throw new Error("No hay datos en la store para el selector dado")
    }

    return value
}