let grid = new Array(100).fill(0);
grid[grid.length - 1] = 1;

console.log(grid.map((i) => (i == 0 ? ` ` : `${i}`)).join(""));
//height
for (let i = 0; i < grid.length - 1; i++) {
	let next_grid = new Array(grid.length).fill(0);
	//width
	for (let j = 0; j < grid.length; j++) {
		let next: number;
		if (j == 0) {
			next = rule(grid[0] * 2 + grid[1]);
		} else if (j == grid.length - 1) {
			next = rule(grid[grid.length - 2] * 4 + grid[grid.length - 1] * 2);
		} else {
			next = rule(grid[j - 1] * 4 + grid[j] * 2 + grid[j + 1]);
		}
		next_grid[j] = next;
	}
	grid = next_grid;
	console.log(grid.map((i) => (i == 0 ? ` ` : `${i}`)).join(""));
}

function rule(bits: number): number {
	// current pattern  111 110 101 100 011 010 001 000
	// new cell          0   1   1   0   1   1   1   0
	if ([0, 4, 7].includes(bits)) return 0;
	else if ([1, 2, 3, 5, 6].includes(bits)) return 1;
	else return 2;
}
