/*
	Util.js
	-------

	File to store utility functions that are used throughout the app
*/

import pako from "pako";

// URL-safe character set maximizing unique characters, High entropy set
const URL_SAFE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~!$&'()*+,;=:@";
const BASE = URL_SAFE_CHARS.length;

// Util class
export default class Util {

	/**
	 * Static method to take an event (e) and stop it from bubbling up
	 * 
	 */
	static stopEvent(e) {
		e.preventDefault();
		e.stopPropagation();
		e.cancelBubble = true;
		return e;
	}


	// the sequel to JSON 😎
	static JSON2 = {
		stringify: (obj) => {
			return JSON.stringify(obj, null, 0)
				.replace(/\"(\w+)\":/g, '$1:'); // Remove quotes around keys
		},
		
		parse: (str) => {
			return JSON.parse(
				str.replace(/(\w+):/g, '"$1":') // Add quotes back to keys
			);
		}
	};


	// Convert binary to a high-base URL-safe encoding
	static encodeBaseHigh(data) {
		let num = BigInt("0x" + [...data].map((b) => b.toString(16).padStart(2, "0")).join(""));
		let encoded = "";
		while (num > 0) {
			encoded = URL_SAFE_CHARS[num % BigInt(BASE)] + encoded;
			num /= BigInt(BASE);
		}
		return encoded;
	}


	// Convert high-base encoding back to binary
	static decodeBaseHigh(encoded) {
		let num = BigInt(0);
		for (const char of encoded) {
			num = num * BigInt(BASE) + BigInt(URL_SAFE_CHARS.indexOf(char));
		}
		let hex = num.toString(16);
		if (hex.length % 2) hex = "0" + hex;
		return Uint8Array.from(hex.match(/.{1,2}/g).map((b) => parseInt(b, 16)));
	}


	// Compress and encode
	static compressToUrlSafe(input) {
		const compressed = pako.deflate(input, { level: 9 }); // Max compression
		return Util.encodeBaseHigh(compressed);
	}

	
	// Decode and decompress
	static decompressFromUrlSafe(encoded) {
		const binary = Util.decodeBaseHigh(encoded);
		return new TextDecoder().decode(pako.inflate(binary));
	}

}





