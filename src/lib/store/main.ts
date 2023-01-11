import * as E from '@anyass3/encryption';
export default {
	storeType: {
		publicKey: 'sessionPersistantStore',
		signPublicKey: 'sessionPersistantStore',
		token: 'sessionPersistantStore',
		content: 'sessionPersistantStore',
		title: 'sessionPersistantStore',
		cover: 'sessionPersistantStore'
	},
	state: {
		cover: {},
		content: '',
		title: '',
		writeMode: false,
		navHeight: undefined,
		metamaskPublicKey: undefined,
		publicKey: undefined,
		signPublicKey: undefined,
		token: undefined
	},
	actions: {
		async metamaskPublicKey({ commit }) {
			commit('metamaskPublicKey', await E.getMetaMaskPublicKey());
		}
	}
};
