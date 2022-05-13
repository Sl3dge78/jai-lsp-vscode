#import "Compiler";

#run build();

build :: () {
    set_build_options_dc( .{do_output = false} );
    w := compiler_create_workspace();

    options := get_build_options();
    options.output_type = .NO_OUTPUT;
    options.backend = .X64;
    set_build_options(options, w);

    add_build_file("main.jai", w);
}