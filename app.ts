#! /usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";

//generate the GR NO:
const randomNumber: number = Math.floor(Math.random() * 10000);
// console.log(chalk.bold.greenBright(randomNumber));

let myBalance: number = 0;

const courses = ["MS Office", "HTML5", "Python", "CSS3", "TypeScript"];
//for Tution fee:
const tutionFee: { [key: string]: number } = {
  "MS Office": 3000,
  HTML5: 2000,
  Python: 3000,
  CSS3: 2500,
  TypeScript: 5000,
};
let answer = await inquirer.prompt([
  {
    name: "name",
    type: "input",
    message: "Enter student Name",
    validate: function (value) {
      if (value.trim() !== "") {
        return true;
      }
      return "Please Enter Your Name";
    },
  },

  {
    name: "courses",
    type: "list",
    message: "Select the Course to Enrolled",
    choices: courses.map((course) => ({
      name: chalk.bold.blue(course),
      value: course,
    })),
  },
]);

console.log(
  chalk.bold.yellow(`\nTutionFees: ${tutionFee[answer.courses]}/-\n`)
);
// console.log(`Balance: ${myBalance}\n`);

//for Payment:
let payment = await inquirer.prompt([
  {
    name: "payment",
    type: "list",
    message: "Select Payment method:",
    choices: ["Bank Transfer", "EasyPaisa", "JazzCash"],
  },
  {
    name: "amount",
    type: "input",
    message: "Transfer fees",
    validate: function (value) {
      if (value.trim() !== "") {
        return true;
      }
      return "Please a non-empty Value.";
    },
  },
]);
console.log(`\nYou select payment method "${payment.payment}"`);
const tutionFees = tutionFee[answer.courses];
const paymentAmount = parseFloat(payment.amount);

if (tutionFees === paymentAmount) {
  console.log(
    chalk.bold.green(
      `Congratulations, You have Successfully enrolled in ${answer.courses}.\n`
    )
  );

  let ans = await inquirer.prompt([
    {
      name: "select",
      type: "list",
      message: "What Would You like to do next?",
      choices: ["ViewStatus", "Exit"],
    },
  ]);
  if (ans.select === "ViewStatus") {
    console.log(chalk.bold.green("\n*********Statuss***********\n"));
    console.log(chalk.bold.green(`Student Name: ${answer.name}`));
    console.log(chalk.bold.green(`Student ID: ${randomNumber}`));
    console.log(chalk.bold.green(`Course: ${answer.courses}`));
  }
} else {
  console.log("Invalid Amount\n");
}