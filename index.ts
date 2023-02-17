#! /usr/bin/env node

import inquirer from 'inquirer';

class Todo {
    private items: string[] = [];

    constructor() { }

    public add(item: string): void {
        this.items.push(item);
    }

    public remove(index: number): void {
        this.items.splice(index, 1);
    }

    public list(): void {
        console.log(`You have ${this.items.length} items in your Todo list:`);
        this.items.forEach((item, index) => {
            console.log(`${index + 1}: ${item}`);
        });
    }
}

const todo = new Todo();

function main() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'operation',
                message: 'What do you want to do?',
                choices: ['Add', 'Remove', 'List', 'Quit'],
            },
        ])
        .then((answers) => {
            if (answers.operation === 'Add') {
                inquirer
                    .prompt([
                        {
                            type: 'input',
                            name: 'item',
                            message: 'Enter the Todo item:',
                        },
                    ])
                    .then((answers) => {
                        todo.add(answers.item);
                        main();
                    });
            }
            else if (answers.operation === "Remove") {
                inquirer.prompt([
                    {
                        type: "input",
                        name: "index",
                        message: "Enter the index of todo item"
                    },
                ])
                .then((answers) => {
                    const index = parseInt(answers.index, 10);
                    todo.remove(index - 1);
                    main();
                  });
            }
            
            else if(answers.operation === "List"){
                todo.list();
                main();
            }
            else{
                console.log("Todo-List-END");
            }
        });
    }
    main();




