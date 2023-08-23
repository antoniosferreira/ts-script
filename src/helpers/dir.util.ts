import * as fileSystem from 'fs';

export function createTestsDirectory(dir: string) {
    if (fileSystem.existsSync(dir)) {
        fileSystem.rmdirSync(dir, {
            recursive: true,
        })
    }
    if (!fileSystem.existsSync(dir)){
        fileSystem.mkdirSync(dir);
    }
}


