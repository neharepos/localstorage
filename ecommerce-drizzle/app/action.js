"use server";

import {db} from "@/src/db"
import { products } from "@/src/db/schema"
import { saveImage } from "@/src/lib/upload";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export async function createProduct(formData) {
  const name = formData.get("name");
  const description = formData.get("description");
  const price = parseInt(formData.get("price"));
  const image = formData.get("image");

  const imageUrl = await saveImage(image);

  await db.insert(products).values({
    name,
    description,
    price,
    imageUrl,
  });

  revalidatePath("/");
}

export async function deleteProduct(id) {
  await db.delete(products).where(eq(products.id, id));
  revalidatePath("/");
}