import { c as create_ssr_component, a as subscribe, e as escape, f as add_attribute, v as validate_component } from "../../chunks/index-7de4d89c.js";
import { s as store } from "../../chunks/index-b329299a.js";
import "markdown-hljs";
import "stores-x";
import "connectome";
const Writer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $content, $$unsubscribe_content;
  const { content } = store.state;
  $$unsubscribe_content = subscribe(content, (value) => $content = value);
  $$unsubscribe_content();
  return `<div class="${"h-full w-full"}"><textarea name="${""}" id="${""}" class="${"h-full w-full focus:outline-none focus:ring-2 p-2 ring-gray-800 bg-gray-800"}">${$content || ""}</textarea></div>`;
});
const Write = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_content;
  let $title, $$unsubscribe_title;
  const { title, content, snack } = store.state;
  $$unsubscribe_title = subscribe(title, (value) => $title = value);
  $$unsubscribe_content = subscribe(content, (value) => value);
  $$unsubscribe_content();
  $$unsubscribe_title();
  return `<div class="${"w-full h-full flex flex-col"}"><div class="${"sticky top-0 flex justify-between gap-5"}"><button class="${"btn p-[0.25rem!important] bg-gray-600 text-xl w-[min-content!important] uppercase text-center "}">${escape("preview")}</button>
		<div class="${"flex gap-2"}"><input placeholder="${"Title"}" class="${"focus:outline-none max-w-full w-[25rem] p-[0.25rem!important] flex-grow placeholder:text-gray-700 bg-slate-500 rounded text-center"}" type="${"text"}"${add_attribute("value", $title, 0)}>
			<button class="${"btn p-[0.25rem!important] bg-gray-700 text-xl w-[min-content!important] uppercase text-center "}">publish</button></div></div>
	${`${validate_component(Writer, "Writer").$$render($$result, {}, {}, {})}`}</div>`;
});
export { Write as default };
