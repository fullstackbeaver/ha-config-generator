import { existsSync, lstatSync, readFileSync, readdirSync, writeFileSync } from 'fs';
import path from 'path';

function parseDirectoryAndUpdateFiles(directory) {
  if (!existsSync(directory)) {
    console.error(`Error: Directory '${directory}' does not exist.`);
    process.exit(1);
  }

  const elements = readdirSync(directory);
  for (const file of elements) {
    const filePath = path.join(directory, file);

    if (lstatSync(filePath).isDirectory()) {
      parseDirectoryAndUpdateFiles(filePath);
    } else if (filePath.endsWith('.js')) {
      const newContent = updateFileContent(readFileSync(filePath, 'utf8'))
      newContent && writeFileSync(filePath, newContent, 'utf8');
    }
  }
}

function updateFileContent(fileContent) {
  let modified = false;
  const lines = fileContent.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('import') && line.includes('from ".')) {
      // Find the last double quote
      const lastDoubleQuoteIndex = line.lastIndexOf('"');

      // Append .js before the last double quote
      const modifiedLine = line.slice(0, lastDoubleQuoteIndex) + '.js"' + line.slice(lastDoubleQuoteIndex + 1);

      // Replace the original line with the modified one
      lines[i] = modifiedLine;
      modified = true;
    }
  }

  return modified
    ? lines.join('\n')
    : false;
}

parseDirectoryAndUpdateFiles(process.cwd() + "/dist/src")