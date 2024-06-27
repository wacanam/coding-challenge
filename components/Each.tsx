import React, { Children } from "react";

interface EachProps<T> {
    of: T[]
    render: (item: T, index: number) => React.ReactNode
}

export default function Each<T>({ of, render }: EachProps<T>) {
  return of.map((item, index) => render(item, index))
}
