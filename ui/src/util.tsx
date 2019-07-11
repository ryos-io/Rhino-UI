export function omit<T extends object, K extends keyof T>(target: T, ...omitKeys: K[]): Omit<T, K> {
    return (Object.keys(target) as K[]).reduce(
        (res, key) => {
            if (!omitKeys.includes(key)) {
                res[key] = target[key]
            }
            return res
        },
        {} as any
    )
}

/**
 * Type-safe access of deep property of an object
 *
 * @param obj                   Object to get deep property
 * @param unsafeDataOperation   Function that returns the deep property
 * @param valueIfFail           Value to return in case if there is no such property
 */
export function getInSafe<O, T>(obj: O, unsafeDataOperation: (x: O) => T, valueIfFail?: any): T {
    try {
        return unsafeDataOperation(obj)
    } catch (error) {
        return valueIfFail
    }
}
