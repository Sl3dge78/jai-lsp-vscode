
main :: () {

    a := 5;
    a += 1;


    b := 12;
	
	c := add_stuff(a, b);	
}

add_stuff :: (a : int, b: int) -> int {
    return a + b;
}