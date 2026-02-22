import {db} from "@/src/db"
import { products } from "@/src/db/schema"
import { createProduct, deleteProduct } from '../app/action'
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

export default async function Page() {
  const allProducts = await db.select().from(products);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Add Product</h1>

      <form action={createProduct}>
        <input name="name" placeholder="Name" required />
        <br /><br />

        <textarea name="description" placeholder="Description" />
        <br /><br />

        <input name="price" type="number" placeholder="Price" required />
        <br /><br />

        <input name="image" type="file" accept="image/*" />
        <br /><br />

        <button type="submit">Create</button>
      </form>

      <hr />

      <h2>Products</h2>

      {allProducts.map((product: { id: Key | null | undefined; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; description: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; price: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; imageUrl: string | Blob | undefined; }) => (
        <div key={product.id} style={{ marginBottom: "20px" }}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>₹ {product.price}</p>

          {product.imageUrl && (
            <img
              src={product.imageUrl}
              width="200"
              alt={product.name}
            />
          )}

          <form action={deleteProduct.bind(null, product.id)}>
            <button type="submit">Delete</button>
          </form>
        </div>
      ))}
    </div>
  );
}