
import * as E from '@anyass3/encryption';
export default {
	state: {
		content: '',
		title: '',
		navHeight: undefined,
		isAuthenticated: false,
		metamaskPublicKey: undefined,
		publicKey: undefined,
		signPublicKey: undefined,
		token: undefined
	},
	actions:{
		async metamaskPublicKey({commit}){
			commit('metamaskPublicKey',await E.getMetaMaskPublicKey())
		},
	}
};
