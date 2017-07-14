const robot = require("robotjs");
const shell = require("shelljs");
const shell_escape = require("shell-escape");
const chalk = require("chalk");
const sleep = require("sleep");
const S = require("string");
const clipboardy = require("clipboardy");
const fs = require("fs");
const punycode = require("punycode");

//robot.moveMouse(400,400)

pdfs = shell.ls("*.pdf");

for (a_pdf of pdfs) {
  pdf = shell_escape([a_pdf]);
  //console.log(y)

  openPreview(pdf);
  sleep.sleep(2);
  selectAll();
  copyContent();

  sleep.sleep(2);

  oldName = S(a_pdf).split(".pdf")[0];

  newName = oldName + ".txt";

  //writeFromClipboard(newName);

  txt = shell_escape([newName]);

  sleep.sleep(2);
  closePreview();

  openSublime(txt);

  sleep.sleep(2);

  pasteContent();
  saveFile();
  sleep.sleep(2);
  closeSublime();
  sleep.sleep(2);
}

function openPreview(f) {
  if (shell.exec("open " + f).code !== 0) {
    shell.echo(chalk.red("Error"));
    shell.exit(1);
  }
}

function selectAll() {
  robot.keyTap("a", ["command"]);
  //robot.setKeyboardDelay(100);
}

function copyContent() {
  robot.keyTap("c", ["command"]);
}

function openSublime(F) {
  if (shell.exec("subl " + F).code !== 0) {
    shell.echo(chalk.red("Error"));
    shell.exit(1);
  }
}

function pasteContent() {
  robot.keyTap("v", ["command"]);
}

function saveFile() {
  robot.keyTap("s", ["command"]);
}

function closeSublime() {
  robot.keyTap("q", ["command"]);
}

function closePreview() {
  robot.keyTap("w", ["command"]);
}

function writeFromClipboard(fileName) {
  content = clipboardy.readSync();

  fs.writeFile(fileName, punycode.toUnicode(content), "utf8", err => {
    if (err) throw err;
    console.log(fileName);
  });
}
