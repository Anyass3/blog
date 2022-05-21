import { c as create_ssr_component, a as subscribe, v as validate_component } from "../../chunks/index-7de4d89c.js";
import { s as store } from "../../chunks/index-b329299a.js";
import "markdown-hljs";
import "stores-x";
import "connectome";
const Render = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe__content;
  let { content = "" } = $$props;
  const _content = store.g("content");
  $$unsubscribe__content = subscribe(_content, (value) => value);
  let { codeStyle = "/hljs/github-dark.css" } = $$props;
  if ($$props.content === void 0 && $$bindings.content && content !== void 0)
    $$bindings.content(content);
  if ($$props.codeStyle === void 0 && $$bindings.codeStyle && codeStyle !== void 0)
    $$bindings.codeStyle(codeStyle);
  $$unsubscribe__content();
  return `<div class="${"h-full overflow-y-auto"}"></div>`;
});
const U5Bblogu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { content } = $$props;
  let { title } = $$props;
  if ($$props.content === void 0 && $$bindings.content && content !== void 0)
    $$bindings.content(content);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  return `<div class="${"w-full h-full flex flex-col"}">${validate_component(Render, "Render").$$render($$result, { content }, {}, {})}</div>`;
});
export { U5Bblogu5D as default };
