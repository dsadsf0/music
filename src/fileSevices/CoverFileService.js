import * as uuid from 'uuid'
import * as path from 'path'


class CoverFileService {
  saveFile(file) {
    try {
      const fileName = uuid.v4() + '.png'
      const filePath = path.resolve('music', fileName)
      file.mv(filePath)
      return file;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new CoverFileService();