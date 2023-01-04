// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types

declare namespace App {
	// interface Error {}
	interface Locals {
		expires: number;
		token: string;
		signedToken: string;
		encryptedData: string;
		encryptedToken: string;
		signKeyPair: {
			signPublicKey: Uint8Array;
			signSecretKey: Uint8Array;
			signPublicKeyHex: string;
			signSecretKeyHex: string;
		};
		keyPair: {
			privateKey: Uint8Array;
			publicKey: Uint8Array;
			privateKeyHex: string;
			publicKeyHex: string;
		};
	}
	// interface PageData {}
	// interface Platform {}
}

// import { SignKeyPair } from '@anyass3/encryption';
