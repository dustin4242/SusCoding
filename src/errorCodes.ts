export function error(errorCode: number, expect: string, line: number) {
	switch (errorCode) {
		default:
			throw `Unknown Error at line ${line} expected: ${expect}`;
	}
}
