import * as process from 'process'
import { Environment } from './Environment'
import path from 'path'
import { Application } from './Application'
import fs from 'fs'
import { ExecutableManager } from './ExecutableManager'
import { EOL } from 'os'
import { Executable } from './Executable'

// Global constants
const APP_VERSION = '1.0.0'
const OUTPUT_DIR_PATH = 'target'
const CONFIG_PATH = 'OMake.ini'
const CONFIG_ENCODING = 'utf-8'

// Helper functions associated with .ini configuration file
const IniFn = {
    isNotComment: (line: string): boolean => !line.startsWith('#'),
    breakLine: (line: string): string[] => line.split('='),
    isValidLine: (sp: string[]): boolean => sp.length == 2,
    trimLine: (line: string) => line.trim(),
} as const

// Version request
if (process.argv[2] == '--version') {
    console.log(`OMake v${APP_VERSION}`)
    process.exit(0)
}

const currentWorkingDir: string = process.cwd()
const executableName: string = process.argv[2]

// Set up environment
const env = new Environment()
const workingDir: string = path.join(currentWorkingDir)
const outputDir: string = path.join(currentWorkingDir, OUTPUT_DIR_PATH)
env.getDatum('workingDir').setValue(workingDir)
env.getDatum('outputDir').setValue(outputDir)

// Create an application
const application = new Application(env)
const executableManger = application.getManager(ExecutableManager)

// Load configuration file
const configurationPath: string = path.join(workingDir, CONFIG_PATH)
if (!fs.existsSync(configurationPath)) {
    console.log(`Error: There should be a configuration file "${CONFIG_PATH}" 
        in the present working directory.`)
    process.exit(-1)
}

const configLines: string[] = fs.readFileSync(configurationPath, CONFIG_ENCODING).split(EOL)
configLines.map(IniFn.trimLine)
    .filter(IniFn.isNotComment)
    .map(IniFn.breakLine)
    .filter(IniFn.isValidLine)
    .forEach(([name, rhs]) => {
        const [workingDir, ...files] = rhs.trim().split(' ').map(IniFn.trimLine)
        const executable: Executable = executableManger.add(name.trim(), workingDir, files)
        if (files.length == 0) {
            executable.addAllFilesInWorkingDir()
        }
    })

try {
    // Create the output directory if it does not exist
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir)
    }

    const executable: Executable = executableManger.getByName(executableName)
    executable.run()
} catch (e) {
    if (e instanceof Error) {
        console.error(e.message)
    }
}
