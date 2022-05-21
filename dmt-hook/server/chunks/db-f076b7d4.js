import Hyperbee from "hyperbee";
import Hypercore from "hypercore";
const core = new Hypercore("./.db");
core.ready().then(() => {
  console.log({ dbKey: core.key });
});
const db = new Hyperbee(core, {
  keyEncoding: "utf-8",
  valueEncoding: "json"
});
const state = async () => {
  let state2 = [];
  for await (const {
    key,
    value: { title }
  } of db.createReadStream()) {
    state2.push({ pathname: key, title });
  }
  console.log({ db: state2 });
  return state2 || [];
};
const put = async (title, body) => {
  const content = { title, body };
  const matches = title.match(/[\w]+/g);
  if (!matches)
    return;
  const pathname = matches.join("-");
  await db.put(pathname, content);
  return pathname;
};
const get = async (title) => {
  const item = await db.get(title);
  if (!item)
    return;
  return { content: item.value.body, title: item.value.title, pathname: item.key };
};
export { get as g, put as p, state as s };
