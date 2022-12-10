import * as uuid from 'uuid'
import * as path from 'path'
import fs from 'fs'

class CoverFileService {
  saveCover(file) {
    try {
      const fileType = file.name.split('.').pop()
      const fileName = uuid.v4() + '.' + fileType
      const filePath = path.resolve('covers', fileName)
      file.mv(filePath)
      console.log('------------------------------')
      console.log(`\u001b[1;35m${new Date().toLocaleString()}\u001b[0m`);
      console.log(`cover file \u001b[1;35m${fileName}\u001b[0m saved `);
      return fileName;
    } catch (error) {
      console.log(error);
    }
  }

  removeCover(fileName) {
    try {
      const filePath = path.resolve('covers', fileName)
      fs.unlinkSync(filePath)
    } catch (error) {
      console.log(error);
    }
  }
}

export default new CoverFileService();