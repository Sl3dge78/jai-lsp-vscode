# jai-lsp-vscode README

Support for [jai_lsp](https://github.com/Sl3dge78/jai_lsp) in vscode.
This shouldn't evolve much as the bulk of the work is done on the server side. 

## How to

This extension is a small extension that will run the jai-lsp server. 

1. Install [jai_lsp](https://github.com/Sl3dge78/jai_lsp)
2. Add these two options :
* `jai-lsp.command` : Command to run jai-lsp. If its in your path, it can just be "jai_lsp". If its not in your path, you need to specify the full path to it.
* `jai-lsp.buildFile` : File to build. Can be relative to current workspace directory or absolute. 

Example :
```
"jai-lsp.command": "/bin/jai_lsp",
"jai-lsp.buildFile": "build.jai",
```

3. If your build file is a metaprogram you need to call a procedure during your message loop. There will be a function pointer to it in the build options in user_data_u64. Here's the procedure definition : `lsp_message :: (message : *Message)`. Please look at the server repo for more details.  

Example :
``` 
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
}
``` 

The extension also adds 3 commands : 
- Jai lsp Start : Starts the protocol.
- Jai lsp Stop : Stops the protocol.
- Jai lsp Restart : Restarts everything.

## Notes
- Until the server supports workspace change, you will probably need to retart the server when changing directory.



