const readline = require('readline');

class CodeSnippet {
    constructor(title, code) {
        this.title = title;
        this.code = code;
    }
}

class CodeSnippetsManager {
    constructor() {
        this.snippets = [];
    }

    addSnippet(title, code) {
        const snippet = new CodeSnippet(title, code);
        this.snippets.push(snippet);
        console.log(`Snippet '${title}' added.`);
    }

    viewSnippets() {
        if (this.snippets.length > 0) {
            console.log("All Snippets:");
            this.snippets.forEach((snippet, index) => {
                console.log(`${index + 1}. Title: ${snippet.title}`);
                console.log(`   Code: ${snippet.code}`);
                console.log("------------------");
            });
        } else {
            console.log("No snippets available.");
        }
    }

    getSnippetByTitle(title) {
        const snippet = this.snippets.find(snippet => snippet.title === title);
        if (snippet) {
            console.log(`Snippet '${title}':`);
            console.log(`   Code: ${snippet.code}`);
        } else {
            console.log(`Snippet '${title}' not found.`);
        }
    }

    deleteSnippet(title) {
        const index = this.snippets.findIndex(snippet => snippet.title === title);
        if (index !== -1) {
            this.snippets.splice(index, 1);
            console.log(`Snippet '${title}' deleted.`);
        } else {
            console.log(`Snippet '${title}' not found.`);
        }
    }

    updateSnippet(title, newCode) {
        const snippet = this.snippets.find(snippet => snippet.title === title);
        if (snippet) {
            snippet.code = newCode;
            console.log(`Snippet '${title}' updated.`);
        } else {
            console.log(`Snippet '${title}' not found.`);
        }
    }
}

function displayMenu() {
    console.log("\nJSCodeSnippets - Code Snippets Manager");
    console.log("1. Add Snippet");
    console.log("2. View Snippets");
    console.log("3. Get Snippet by Title");
    console.log("4. Delete Snippet");
    console.log("5. Update Snippet");
    console.log("6. Exit");
}

const snippetsManager = new CodeSnippetsManager();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('close', () => {
    console.log("Exiting JSCodeSnippets. Goodbye!");
});

rl.on('line', (input) => {
    const choice = parseInt(input);

    switch (choice) {
        case 1:
            rl.question("Enter snippet title: ", (title) => {
                rl.question("Enter code snippet: ", (code) => {
                    snippetsManager.addSnippet(title, code);
                    displayMenu();
                });
            });
            break;

        case 2:
            snippetsManager.viewSnippets();
            displayMenu();
            break;

        case 3:
            rl.question("Enter snippet title: ", (title) => {
                snippetsManager.getSnippetByTitle(title);
                displayMenu();
            });
            break;

        case 4:
            rl.question("Enter snippet title to delete: ", (title) => {
                snippetsManager.deleteSnippet(title);
                displayMenu();
            });
            break;

        case 5:
            rl.question("Enter snippet title to update: ", (title) => {
                rl.question("Enter new code snippet: ", (newCode) => {
                    snippetsManager.updateSnippet(title, newCode);
                    displayMenu();
                });
            });
            break;

        case 6:
            rl.close();
            break;

        default:
            console.log("Invalid choice. Please try again.");
            displayMenu();
            break;
    }
});

// Initial display
displayMenu();
