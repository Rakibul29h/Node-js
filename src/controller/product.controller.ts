import type { IncomingMessage, ServerResponse } from "node:http";
import { insertProduct, readProduct } from "../service/product.service.js";
import type { IProduct } from "../types/productsType.js";
import { parseBody } from "../utility/parseBody.js";
import { sendResponse } from "../utility/sendResponse.js";

export const productController = async (
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
    try {
      const products = readProduct();
      sendResponse(res, 200, true, "Product retrived successfully", products);
    } catch (error) {
      sendResponse(res, 404, false, "Something goes wrong", error);
    }
  } else if (method == "GET" && id) {
    // Get product by id
    try {
      const products = readProduct();
      const product = products.find((p: IProduct) => p.id == id);
      if (!product) {
        return sendResponse(res, 404, false, "Product not Found");
      }
      sendResponse(res, 200, true, "Product retrives successfully", product);
    } catch (error) {
      sendResponse(res, 404, false, "Something goes wrong", error);
    }
  } else if (method === "POST" && url === "/products") {
    // Insert new Product
    try {
      const body = await parseBody(req);
      const newProduct = {
        id: Date.now(),
        ...body,
      };
      const products = readProduct();
      products.push(newProduct);
      insertProduct(products);
      sendResponse(res, 200, true, "Product inserted successfully");
    } catch (error) {
      sendResponse(res, 404, false, "Something goes wrong", error);
    }
  } else if (method === "PUT" && id !== null) {
    // put by id
    try {
      const body = await parseBody(req);
      const products = readProduct();
      const index = products.findIndex((p: IProduct) => p.id == id);
      if (index < 0) {
        return sendResponse(res, 404, false, "Product not found");
      }
      products[index] = {
        id: products[index].id,
        ...body,
      };
      insertProduct(products);
      sendResponse(res, 200, true, "Product updated successfully");
    } catch (error) {
      sendResponse(res, 404, false, "Something goes wrong", error);
    }

  } else if (method === "DELETE" && id !== null) {
     try {
      const products = readProduct();
          const index = products.findIndex((p: IProduct) => p.id == id);
    if (index < 0) {
      return sendResponse(res, 404, false, "Product not found");
    }
    products.splice(index, 1);
    insertProduct(products);
      sendResponse(res, 200, true, "Product deleted successfully");
    } catch (error) {
      sendResponse(res, 404, false, "Something goes wrong", error);
    }
   

 
  } else {
   sendResponse(res,404,false,"Route not found")
  }
};
