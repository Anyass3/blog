import { g as get$1 } from "../../chunks/db-f076b7d4.js";
import "path";
import "fs";
import "hyperbee";
import "hypercore";
async function get(event) {
  const pathname = event.url.pathname.match(/[\w-]+/)[0];
  console.log(event.url.pathname);
  let body = await get$1(pathname);
  if (!body)
    return {
      status: 404,
      error: new Error("Sorry! Blog does't exist.")
    };
  return {
    body
  };
}
export { get };
