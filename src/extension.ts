// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { log } from 'console';
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

	const jaiLspPath = vscode.workspace.getConfiguration('jai-lsp').get('command', '');
	if (!jaiLspPath) {
		vscode.window.showErrorMessage("Unable to find jai lsp. Please specify it in your settings. \"jai-lsp.command\".");
		return;
	}

	let serverOptions: ServerOptions = {
		command: jaiLspPath
	};

	let clientOptions: LanguageClientOptions = {
		documentSelector: [{ scheme: 'file', language: 'jai' }],
		outputChannel: vscode.window.createOutputChannel("Jai lsp"),
	};

	client = new LanguageClient(
		"jai_lsp", "Jai Lsp", serverOptions, clientOptions
	);

	client.start();

	const start_cmd = vscode.commands.registerCommand("jai-lsp.start", () => {
		client.start();
	});
	context.subscriptions.push(start_cmd);

	const stop_cmd = vscode.commands.registerCommand("jai-lsp.stop", async () => {
		await client.stop();
	});
	context.subscriptions.push(stop_cmd);

	const restart_cmd = vscode.commands.registerCommand("jai-lsp.restart", async () => {
		await client.stop();
		client.start();
	});
	context.subscriptions.push(restart_cmd);

}

// this method is called when your extension is deactivated
export function deactivate() {
	return client.stop();
}
