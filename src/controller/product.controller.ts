import type { IncomingMessage, ServerResponse } from "node:http";
import { readProduct } from "../service/product.service.js";
import type { IProduct } from "../types/productsType.js";
import { parseBody } from "../utility/parseBody.js";

export  const productController = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;
  const urlParts = url?.split("/");
  const id =
    urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null;

  // get all products
  if (url == "/products" && method == "GET") {
    const products = readProduct();
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product retrives successfully",
        data: products,
      }),
    );
  } else if (method == "GET" && id) {
    const products = readProduct();
    const product = products.find((p: IProduct) => p.id == id);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product retrives successfully",
        data: product,
      }),
    );
  }else if(method === "POST" && url==="/products"){
    const body=await parseBody(req)
    console.log(body);
  } else {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "This is Product route but not found" }));
  }
};
