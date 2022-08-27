bun src/main.ts $1
rustc -C opt-level=3 main.rs
rm -rf main.rs
chmod +x ./main
./main
