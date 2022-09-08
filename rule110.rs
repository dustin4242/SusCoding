#[allow(non_snake_case)]
#[allow(unused_assignments)]
#[allow(unused_variables)]
#[allow(unused_mut)]
fn main() {
let mut createArray = | length: usize | {

let mut newArray = vec![0];

for i in 0..length as i32 {

newArray.push(0);

};

return newArray;

};

let automataLength = 20;
let mut initArray = createArray(automataLength);
initArray[(automataLength - 1) as usize] = 1;
println!("{:?}", &initArray);
for i in 0..automataLength as i32 - 2 {
let mut newArray = createArray(automataLength);
for pos in 0..automataLength as i32 - 1 {
let mut analyze = initArray[(pos) as usize] * 100 + initArray[(pos + 1) as usize] * 10 + initArray[(pos + 2) as usize];
if (analyze) == (0) {
newArray[(pos + 1) as usize] = 0;
} else if (analyze) == (1) {
newArray[(pos + 1) as usize] = 1;
} else if (analyze) == (10) {
newArray[(pos + 1) as usize] = 1;
} else if (analyze) == (11) {
newArray[(pos + 1) as usize] = 1;
} else if (analyze) == (100) {
newArray[(pos + 1) as usize] = 0;
} else if (analyze) == (101) {
newArray[(pos + 1) as usize] = 1;
} else if (analyze) == (110) {
newArray[(pos + 1) as usize] = 1;
} else if (analyze) == (111) {
newArray[(pos + 1) as usize] = 0;
};
};
initArray = newArray;
println!("{:?}", &initArray);
};
}