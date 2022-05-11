#import "Basic";

main :: () {
    print("This is a basic file to test lsp");
    a := 5;
    a += 1;
    print("%", a);

    b :: "constant";
    print_string(b);
}

print_string :: (str: string) {
    print("%", str);
}