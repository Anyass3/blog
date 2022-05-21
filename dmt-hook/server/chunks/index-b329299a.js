import StoreX from "stores-x";
import { connect } from "connectome";
import { n as noop, b as safe_not_equal } from "./index-7de4d89c.js";
var connectome = {
  actions: {
    startConnectome({ commit, dispatch, state }) {
      const port = 7780;
      const endpoint = location.protocol.includes("https") && location.port ? `wss://${location.hostname}:${port}` : void 0;
      const protocol = "dmtapp/meet";
      class Socket {
        constructor() {
          this.connector = connect({ protocol, port, endpoint });
          window["sk"] = this;
        }
        emitLocal(signal, data) {
          this.connector.emit(signal, data);
        }
        emit(signal, data) {
          this.connector.signal(signal, data);
        }
        on(signal, fn) {
          this.connector.on(signal, fn);
        }
        get connected() {
          return this.connector.connected;
        }
        get disconnected() {
          return this.connector.closed();
        }
        reconnect() {
          this.connector.connection.terminate();
        }
        disconnect() {
          this.emit("signal-disconnect", "disconnected by user");
          this.connector.decommission();
          this.connector = null;
          dispatch("socket", {}).then(() => setTimeout(() => dispatch("startConnectome")));
        }
        get id() {
          return this.connector.clientPublicKeyHex;
        }
      }
      commit("socket", new Socket());
    }
  }
};
const subscriber_queue = [];
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe(run, invalidate = noop) {
    const subscriber = [run, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe };
}
function createSnackStore() {
  const { subscribe, update, set } = writable(null);
  return {
    subscribe,
    show: (value, timeout = 3e3) => update(() => {
      setTimeout(() => set(null), timeout);
      return value;
    })
  };
}
var main = {
  noStore: ["snack"],
  state: {
    content: "",
    title: "",
    snack: createSnackStore()
  }
};
var store = StoreX([main, connectome]);
export { store as s };
