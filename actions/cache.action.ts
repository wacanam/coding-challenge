"use server";

import { revalidatePath as reval } from "next/cache";

export const revalidatePath = async (path: string, type: "page"| "layout") => {
    return reval(path, type);
}