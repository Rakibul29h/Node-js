import type { IncomingMessage, ServerResponse } from "node:http";

export const productController = (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;

  if (url == "/product" && method == "GET") {

    const products=[
        {
            id:1,
            name:"product-1"
        }
    ]
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "Product retrives successfully" ,
        data:products
    }));
  } else {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "This is Product route but not found" }));
  }
};
