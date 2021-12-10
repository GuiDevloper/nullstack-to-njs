const child = require('child_process');
const path = require('path');
const fs = require('fs');
const parseTSX = require('./tsx-parser');
const args = process.argv.slice(2);
const osCLI = (cli) => /^win/.test(process.platform) ? `${cli}.cmd` : cli;

function getFullPath(folder, filename) {
  return path.join(process.cwd(), `./${folder}/`, filename);
}

function compileFile(filename) {
  const fullPath = getFullPath('src', filename);
  const fileText = fs.readFileSync(fullPath, 'utf8');
  const newFullPath = getFullPath('out', filename.replace(/\.tsx$/, '.njs'));
  const outFolder = path.join(process.cwd(), './out', filename, '..');
  if (!fs.existsSync(outFolder)) {
    fs.mkdirSync(outFolder, { recursive: true });
  }
  const parsed = !fileText.trim() ? '' : (
    filename.endsWith('.tsx') ? parseTSX(fileText) : fileText
  );
  fs.writeFileSync(newFullPath, parsed);
  // console.log(`${new Date().getMinutes()}:${new Date().getSeconds()}:${new Date().getMilliseconds()} ${filename} file Changed`);
}

let fsWait = [];
function createWatch(file, waitIdx) {
  fs.watch(path.join('./src', file), (_event, filename) => {
    if (filename && !fsWait[waitIdx]) {
      fsWait[waitIdx] = true;
      setTimeout(() => {
        fsWait[waitIdx] = false;
        compileFile(file);
      }, 100);
    }
  });
}

function getFiles(directory, files = []) {

  fs.readdirSync(directory).forEach(file => {
    const absolute = path.join(directory, file);

    if (fs.statSync(absolute).isDirectory()) {
      files = getFiles(absolute, files);
    } else {
      const filePath = path.relative(
        path.join(process.cwd(), './src'),
        absolute
      );

      files = [ ...files, filePath ];
    }
  });

  return files;
}

function runCLI() {
  const pawn = child.spawn(
    osCLI('npx'),
    ['nullstack', 'start', ...args],
    { encoding: 'utf8', stdio: 'pipe' }
  );
  pawn.stdout.on('data', data => {
    process.stdout.write(data, 'utf8');
  });
  pawn.stderr.on('data', err => {
    process.stderr.write(err, 'utf8');
  });
  process.stdin.on('data', data => {
    pawn.stdin.write(data);
  });
}

function startWatching() {
  const srcFiles = getFiles(path.join(process.cwd(), './src'));
  fsWait = new Array(srcFiles.length).fill(false);
  srcFiles.forEach((file, waitIdx) => {
    compileFile(file);
    createWatch(file, waitIdx);
  });
}

module.exports = {
  getFullPath,
  compileFile,
  createWatch,
  getFiles,
  runCLI,
  startWatching
}