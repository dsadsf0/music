import * as uuid from 'uuid'
import * as path from 'path'

class SongFileService {
  saveSong(file) {
    try {
      const fileType = file.name.split('.').pop()
      const fileName = uuid.v4() + '.' + fileType
      const filePath = path.resolve('music', fileName)
      file.mv(filePath)
      return fileName;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new SongFileService();