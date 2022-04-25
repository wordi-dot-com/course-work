const groupBy = <T, K> (
    arr: T[],
    selector: (x: T) => K
): Array<
    {
        key: K,
        elements: T[]
    }
> => {
    const map = arr.reduce((acc, x) => {
        const key = selector(x)
        return acc.set(
            key,
            [...(acc.get(key) || []), x]
        )
    }, new Map<K, T[]>())

    return Array.from(map, ([key, elements]) => ({ key, elements }))
}

export default groupBy;
