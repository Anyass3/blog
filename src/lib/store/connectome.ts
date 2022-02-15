import { dev } from '$app/env';
import { connect } from 'connectome';
import type { Connector } from 'connectome/typings';

export default {
	actions: {
		startConnectome({ commit, dispatch, state }) {
			//  needs some work and thinking on how to make decentralized connection between user nodes
			// but soon
			//@ts-ignore
			// const port: number = location.host.includes('127.0.0.1')
			//   ? 3800
			//   :
			const port: number = import.meta.env.VITE_PORT || 7780;
			//@ts-ignore
			const endpoint: string =
				import.meta.env.VITE_ENDPOINT ||
				(location.protocol.includes('https') && location.port
					? `wss://${location.hostname}:${port}`
					: undefined);
			const protocol = 'dmtapp/meet';

			class Socket {
				connector: Connector;

				constructor() {
					this.connector = connect({ protocol, port, endpoint });
					window['sk'] = this;
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
					//@ts-ignore
					this.connector.connection.terminate();
					// this.emitLocal('reconnecting');
					// this.emit('reconnected'); // it will only reach the server if connected
				}
				disconnect() {
					this.emit('signal-disconnect', 'disconnected by user');
					this.connector.decommission();
					this.connector = null;
					dispatch('socket', {}).then(() => setTimeout(() => dispatch('startConnectome')));
				}
				get id() {
					return this.connector.clientPublicKeyHex;
				}
			}
			commit('socket', new Socket());
		}
	}
};
