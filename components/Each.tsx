import React, { Children } from "react";

interface EachProps<T> {
    of: T[]
    render: (item: T, index: number) => React.ReactNode
}


export default function Each<T>({ of, render }: EachProps<T>) {
  return Children.map(of, (item, index) => {
    return render(item, index)
  })
}
