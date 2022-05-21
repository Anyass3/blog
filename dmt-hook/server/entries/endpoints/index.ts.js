import { s as state } from "../../chunks/db-f076b7d4.js";
import "hyperbee";
import "hypercore";
async function get() {
  const blogs = await state();
  return {
    body: { blogs }
  };
}
export { get };
