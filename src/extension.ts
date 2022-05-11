// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions
} from 'vscode-languageclient/node';


let client: LanguageClient;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	const jaiLspPath = vscode.workspace.getConfiguration('jai_lsp').get('path', '');
	if (!jaiLspPath) {
		vscode.window.showErrorMessage("Unable to find jai lsp. Please specify it in your settings. \"jai_lsp.path\".");
		return;
	}

	let serverOptions: ServerOptions = {
		command: jaiLspPath
	};

	let clientOptions: LanguageClientOptions = {
		documentSelector: [{ scheme: 'file', language: 'jai' }],
		outputChannel: vscode.window.createOutputChannel("Jai lsp"),

	}

	client = new LanguageClient(
		"jai_lsp", "jai lsp", serverOptions, clientOptions
	);

	client.start();

	vscode.commands.registerCommand("jai_lsp.start", () => {
		client.start();
	});

	vscode.commands.registerCommand("jai_lsp.stop", async () => {
		await client.stop();
	});

	vscode.commands.registerCommand("jai_lsp.restart", async () => {
		await client.stop();
		client.start();
	});

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "jai-lsp-vscode" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('jai-lsp-vscode.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from jai_lsp_vscode!');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
	return client.stop();
}
