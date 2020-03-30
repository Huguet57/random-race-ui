const JSONBIN_BODY = 'https://api.jsonbin.io/b/';
const BIN_ID = '5e8281be862c46101ac107ea';

export const JSONBIN_URL = JSONBIN_BODY + BIN_ID;
export const JSONBIN_KEY = "$2b$10$Ss1x5jiRZcbxT5d9Tuu65u4e.LN.sPBW6UGEq89hmE00fMDWu9mJ.";

export const GET_JSON = {
	method: 'GET',
	mode: 'cors',
	headers: {
		'Content-Type': 'application/json',
		'secret-key': JSONBIN_KEY
	}
};

export function POST_JSON(data) {
	return {
		method: 'PUT',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			'Secret-key': JSONBIN_KEY
		}
	};
}
