#[allow(unused_assignments)]
#[allow(unused_mut)]
#[allow(non_snake_case)]
fn main() {
fn helloWorld(mut world: usize) {

let mut hello = "Hello, ".to_owned() + "world!";

println!("{}", hello);

let extra = " And more!".to_owned();

hello = hello + &extra;

println!("{}", hello);


world = 69;

println!("{}", world);

world = world + &351;

println!("{}", world);

}


helloWorld(0);

}