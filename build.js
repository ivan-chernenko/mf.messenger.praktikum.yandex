const fs = require('fs');
const path = require('path');
const {execSync} = require("child_process");

const buildDirPath = path.join(__dirname, 'static');
const srcDirPath = path.join(__dirname, 'src');
const buildIndexFilePath = path.join(__dirname, 'static', 'index.js');

const getFilePathsInDirByExt = (root, ext) => {
    const currentDir = fs.readdirSync(root);
    const filePaths = [];
    for (const token of currentDir) {
        const newRoot = path.join(root, token);
        if (token.includes(ext))
            filePaths.push(newRoot);
        else if (!token.includes('.'))
            filePaths.push(...getFilePathsInDirByExt(newRoot, ext));
    }
    return filePaths;
};

const replaceExportsAndImports = (paths) => {
    const matchersAndReplacers = [
        [/(import .* from\s+['"])(.*)(?=['"])/g, '$1$2.js'],
        [/(export .* from\s+['"])(.*)(?=['"])/g, '$1$2.js'],
    ];

    paths.map(filePath => {
        let fileData = fs.readFileSync(filePath, 'utf8');
        matchersAndReplacers.forEach(([matcher, replacer]) => {
            fileData = fileData.replace(matcher, replacer);
        });
        fs.writeFileSync(filePath, fileData);
    });
};

const buildLessFiles = (paths) => {
    paths.forEach(path => {
        const newPath = path.replace(srcDirPath, buildDirPath).replace('/client', '').replace('.less', '.css');
        execSync(`lessc ${path} ${newPath}`);
    });
};

const includeAllCssFiles = (indexFilePath, paths) => {
    let indexFile = fs.readFileSync(indexFilePath, 'utf8');
    const styles = paths.map(path => {
        return fs.readFileSync(path, 'utf8')
    });
    indexFile = `
        let head = window.document.getElementsByTagName('head')[0];
        let style = window.document.createElement('style');
        style.innerText = \`${styles.join('\n')}\`;
        head.appendChild(style);
        ${indexFile}
    `;
    fs.writeFileSync(indexFilePath, indexFile);
};

const jsFilePaths = getFilePathsInDirByExt(buildDirPath, '.js');
const lessFilePaths = getFilePathsInDirByExt(srcDirPath, '.less');

replaceExportsAndImports(jsFilePaths);
buildLessFiles(lessFilePaths);

const cssFilePaths = getFilePathsInDirByExt(buildDirPath, '.css');
includeAllCssFiles(buildIndexFilePath, cssFilePaths);

