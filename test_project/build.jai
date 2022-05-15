#import "Compiler";
#import "Basic";

#run build();

build :: () {
    set_build_options_dc( .{do_output = false} );
    w := compiler_create_workspace("test program");
    
    options := get_build_options();
    options.output_type = .EXECUTABLE;
    
    lsp_message : (message : *Message);
    is_lsp := false;
    if options.user_data_u64 {
        lsp_message = << cast(*(*Message)) options.user_data_u64;  
        is_lsp = true;
    }

    set_build_options(options, w);
    compiler_begin_intercept(w);
    add_build_file("main.jai", w);
    while true {
        msg := compiler_wait_for_message();
        if !msg continue;
        if msg.kind == .COMPLETE break;
        
        if is_lsp {
            lsp_message(msg);
        }
        
    }
    compiler_end_intercept(w);  
    print("");  
}