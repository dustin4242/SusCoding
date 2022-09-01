#[allow(non_snake_case)]
#[allow(unused_assignments)]
#[allow(unused_mut)]
fn main() {
let mut exampleFunc = | hello: f32 , world: String | {

if hello==69 as f32 {

println!("{:?}, {:?}", hello, world);

};

};


exampleFunc(12 as f32 * 4 as f32 / 2 as f32 - 1 as f32, "not nice".to_owned());


let mut forLoop = | i: f32 , max: f32 | {

if i!=max - 1 as f32 {

exampleFunc(69 as f32, "nice".to_owned());

forLoop(i, max);

};

};

forLoop(0 as f32, 5 as f32);

}