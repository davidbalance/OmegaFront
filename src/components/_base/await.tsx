import React from 'react'

interface AwaitProps<T> {
    promise: Promise<T>,
    children: (value: T) => React.ReactElement
}

async function Await<T>({ promise, children }: AwaitProps<T>) {
    const data = await promise;
    return children(data);
}

export default Await