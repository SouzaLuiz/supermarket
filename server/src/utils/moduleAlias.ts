import { addAliases } from 'module-alias'
import { resolve } from 'path'

addAliases({
  '@models': resolve(__dirname, '..', 'models'),
  '@src': resolve(__dirname, '..'),
  '@utils': resolve(__dirname)
})
