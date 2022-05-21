import { c as create_ssr_component, a as subscribe, e as escape, g as getContext, v as validate_component } from "../../chunks/index-7de4d89c.js";
import { s as store } from "../../chunks/index-b329299a.js";
import "stores-x";
import "connectome";
var snackbar_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".snackbar.svelte-1t5oxgp{position:fixed;top:2rem;z-index:9999;display:none;min-width:100%;background-color:transparent;padding:0.5rem;padding-right:1rem;text-align:center;font-size:0.875rem;line-height:1.25rem;color:transparent}@media(min-width: 768px){.snackbar.svelte-1t5oxgp{top:unset}.snackbar.svelte-1t5oxgp{bottom:2rem}.snackbar.svelte-1t5oxgp{padding-right:unset}.snackbar.svelte-1t5oxgp{padding-left:2rem}.snackbar.svelte-1t5oxgp{font-size:1.125rem;line-height:1.75rem}}.snackbar.svelte-1t5oxgp{-webkit-animation:fadein 0.5s, fadeout 0.5s 2.5s;animation:fadein 0.5s, fadeout 0.5s 2.5s}.message.svelte-1t5oxgp{border-radius:0.125rem;--tw-bg-opacity:1;background-color:rgb(30 41 59 / var(--tw-bg-opacity));padding:1rem;color:#fff}.show.svelte-1t5oxgp{display:flex !important}",
  map: null
};
const Snackbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $snackbar, $$unsubscribe_snackbar;
  const snackbar = store.g("snack");
  $$unsubscribe_snackbar = subscribe(snackbar, (value) => $snackbar = value);
  $$result.css.add(css$1);
  {
    console.log("snackbar", $snackbar);
  }
  $$unsubscribe_snackbar();
  return `<div id="${"snackbar"}" class="${["snackbar svelte-1t5oxgp", $snackbar ? "show" : ""].join(" ").trim()}"><span class="${"message svelte-1t5oxgp"}">${escape($snackbar)}</span></div>`;
});
var app = "";
const getStores = () => {
  const stores = getContext("__svelte__");
  return {
    page: {
      subscribe: stores.page.subscribe
    },
    navigating: {
      subscribe: stores.navigating.subscribe
    },
    get preloading() {
      console.error("stores.preloading is deprecated; use stores.navigating instead");
      return {
        subscribe: stores.navigating.subscribe
      };
    },
    session: stores.session,
    updated: stores.updated
  };
};
const page = {
  subscribe(fn) {
    const store2 = getStores().page;
    return store2.subscribe(fn);
  }
};
var nav_svelte_svelte_type_style_lang = "";
const css = {
  code: ".active.svelte-19dgxx9{--tw-border-opacity:1;border-color:rgb(100 116 139 / var(--tw-border-opacity))\n}",
  map: null
};
const Nav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$result.css.add(css);
  $$unsubscribe_page();
  return `<div class="${"p-2 sticky top-0 z-50 bg-[rgb(29,28,45)] text-cyan-500 border-b-2 border-cyan-900"}"><a href="${"/"}" class="${[
    "btn text-xl w-[min-content!important] border-2 p-[0.5rem!important] border-transparent uppercase text-center  svelte-19dgxx9",
    $page.url.pathname == "/" ? "active" : ""
  ].join(" ").trim()}">blogs</a>
	<a href="${"/write"}" class="${[
    "btn text-xl w-[min-content!important] border-2 p-[0.5rem!important] border-transparent uppercase text-center  svelte-19dgxx9",
    $page.url.pathname == "/write" ? "active" : ""
  ].join(" ").trim()}">write</a>
</div>`;
});
const _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<main class="${"flex justify-center"}"><div class="${"w-[min(55rem,100%)] p-3 min-h-screen flex flex-col"}">${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})}
		${slots.default ? slots.default({}) : ``}</div></main>
${validate_component(Snackbar, "Snackbar").$$render($$result, {}, {}, {})}`;
});
export { _layout as default };
