#[allow(unused_variables)]
fn main() {
    let automata_length = 110;
    let dead = " ";
    let alive = "1";

    let mut init_array = vec![dead];
    for i in 0..automata_length {
        init_array.insert(init_array.len(), dead);
    }
    init_array.insert(init_array.len(), alive);
    print!("{}\n", init_array.join(""));

    for y in 0..automata_length {
        let mut new_array = vec![dead];
        for x in 0..automata_length {
            let analyze = vec![init_array[x], init_array[x + 1], init_array[x + 2]];
            if analyze == vec![dead, dead, dead] {
                new_array.insert(new_array.len(), dead);
            } else if analyze == vec![alive, dead, dead] {
                new_array.insert(new_array.len(), dead);
            } else if analyze == vec![alive, alive, alive] {
                new_array.insert(new_array.len(), dead);
            } else {
                new_array.insert(new_array.len(), alive);
            }
        }
        new_array.insert(new_array.len(), alive);
        init_array = new_array;
        print!("{}\n", init_array.join(""));
    }
}
