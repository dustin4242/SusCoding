export function error(errorCode: number, line: number) {
	switch (errorCode) {
		default:
			throw `Unknown Error at line ${line}`;
	}
}
