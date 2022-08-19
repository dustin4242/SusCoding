#[allow(non_snake_case)]
fn main() {
fn helloWorld() {
let hello = "hello world";
let mut world = "Hello World";
if hello == "hello world" {
println!("{}", hello);
if hello == world {
println!("{}", world);
}
world = "But Reassignable";
println!("{}", world);
}
}
helloWorld();
}