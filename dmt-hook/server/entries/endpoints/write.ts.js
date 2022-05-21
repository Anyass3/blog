import { p as put } from "../../chunks/db-f076b7d4.js";
import "hyperbee";
import "hypercore";
async function get(event) {
  return {
    body: {}
  };
}
async function post(event) {
  const data = await event.request.json();
  console.log(data);
  const pathname = await put(data.title, data.content);
  return {
    body: { pathname }
  };
}
export { get, post };
