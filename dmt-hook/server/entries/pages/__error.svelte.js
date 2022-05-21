import { c as create_ssr_component, e as escape } from "../../chunks/index-7de4d89c.js";
function load({ error, status }) {
  return { props: { error, status } };
}
const _error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { status } = $$props;
  let { error } = $$props;
  console.error(error?.stack);
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  if ($$props.error === void 0 && $$bindings.error && error !== void 0)
    $$bindings.error(error);
  {
    console.log({ error, status });
  }
  return `<div class="${"flex justify-center flex-wrap items-center flex-grow font-light"}"><div class="${"text-red-500"}"><p class="${"text-7xl"}">Error Code: ${escape(status)}</p>
		<p class="${"text-5xl"}">${escape(error?.message)}</p></div>
	<button class="${"border-2 p-1 font-semibold shadow-lg rounded-md text-red-500 border-red-500 hover:bg-red-100 hover:border-red-400 hover:shadow-sm"}">refresh page</button></div>`;
});
export { _error as default, load };
