import fs from 'fs'
import path from 'path'

const modelsDir = path.join(__dirname, '../src/models/')
const schemaPath = path.join(__dirname, '../src/prisma/schema.prisma')

const schemaHeader = `
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}
`

const modelFiles = fs
  .readdirSync(modelsDir)
  .filter(file => file.endsWith('.prisma'))
  .map(file => fs.readFileSync(path.join(modelsDir, file), 'utf-8'))
  .join('\n')

fs.writeFileSync(schemaPath, schemaHeader + '\n' + modelFiles)

console.log('schema.prisma has been successfully generated!')
