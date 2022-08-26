#[allow(non_snake_case)]
fn main() {
fn helloWorld(mut world: &str) {
let hello = "hello world";
let num = 0;
if num == 0 {
println!("numbers work!");
}
if hello == world {
world = "This passes test";
println!("{:?}", world);
}
}
helloWorld("hello world");
}