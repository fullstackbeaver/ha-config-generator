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
    if (lstatSync(filePath).isDirectory()){
      parseDirectoryAndUpdateFiles(filePath);
    }
    else{
      const fileContent = readFileSync(filePath, 'utf8');

      const modifiedContent = fileContent.replace(
        /import \{(.*)\} from \'\.\/(.*)\';/g,
        (match, group1, group2) => `import { ${group1} } from './${group2}.js';`
      );

      modifiedContent !== fileContent && writeFileSync(filePath, modifiedContent, 'utf8');
    }
  }
}

parseDirectoryAndUpdateFiles(process.cwd() + "/dist")