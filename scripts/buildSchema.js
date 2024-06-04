import fs from 'fs'
import path from 'path'

const modelsRootPath = path.join(__dirname, '..', 'prisma', 'models')
const schemaOutputPath = path.join(__dirname, '..', 'prisma', 'schema.prisma')

const schemaHeader = `
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}
`

function getPrismaFiles(dir) {
  let files = []

  fs.readdirSync(dir).forEach(file => {
    let fullPath = path.join(dir, file)
    if (fs.statSync(fullPath).isDirectory()) {
      files = files.concat(getPrismaFiles(fullPath))
    } else if (path.extname(fullPath) === '.prisma') {
      files.push(fullPath)
    }
  })

  return files
}

const prismaFiles = getPrismaFiles(modelsRootPath)
const combinedPrismaContent = prismaFiles
  .map(file => fs.readFileSync(file, 'utf8'))
  .join('\n')

fs.writeFileSync(schemaOutputPath, schemaHeader + '\n' + combinedPrismaContent)

console.log('schema.prisma has been successfully generated!')
