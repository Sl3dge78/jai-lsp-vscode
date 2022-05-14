#import "Compiler";

#run build();

build :: () {
    set_build_options_dc( .{do_output = false} );
    w := compiler_create_workspace("test program");

    options := get_build_options();
    options.output_type = .EXECUTABLE;
    //options.backend = .X64;
    set_build_options(options, w);

    add_build_file("main.jai", w);
}