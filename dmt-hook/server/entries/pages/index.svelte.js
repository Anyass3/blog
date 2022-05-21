import { c as create_ssr_component, d as each, e as escape } from "../../chunks/index-7de4d89c.js";
const Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { blogs = [] } = $$props;
  if ($$props.blogs === void 0 && $$bindings.blogs && blogs !== void 0)
    $$bindings.blogs(blogs);
  {
    console.log("blogs", blogs);
  }
  return `<div class="${"w-full h-full flex flex-col gap-5"}">${each(blogs, ({ title, pathname }, idx) => {
    return `<div><p class="${"text-2xl"}">${escape(idx + 1)}.
				<a href="${"/" + escape(pathname)}" class="${"underline"}">${escape(title)}</a></p>
		</div>`;
  })}
</div>`;
});
export { Routes as default };
