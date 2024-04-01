import { Controller, Post, Body } from "@nestjs/common"

const qiniu = require('qiniu')

const qiniuCloudCdnSdk = require('../../config/base.config').baseConfig.qiniuSDK.cdn

const mac = new qiniu.auth.digest.Mac(qiniuCloudCdnSdk.ak, qiniuCloudCdnSdk.sk)

@Controller('cdn')
export class CdnController {

  @Post('upload')
  upload(@Body() body) {
    const files = body.fileList
    const uploads = files.map(file => {
      return this.uploadPolicy(
        file,
        file
      )
    })
    Promise.all(uploads).then(resps => {
      return resps
    }).catch(errs => {
      console.log('upload_file_error', errs)
    })
  }

  uploadPolicy(key: string, file) {
    // 创建上传凭证token
    const options = {
      scope: qiniuCloudCdnSdk.bucket + ':' + key,
    }

    const ccstorePolicy = new qiniu.rs.PutPolicy(options)
    const uploadToken = ccstorePolicy.uploadToken(mac)

    const config = new qiniu.conf.Config()
    config.zone = qiniu.zone.Zone_z0
    const formUploader = new qiniu.form_up.FormUploader(config)
    const putExtra = new qiniu.form_up.PutExtra()

    return new Promise((resolve, reject) => {
      formUploader.putFile(uploadToken, key, file, putExtra, (err, body, info) => {
        if (err) {
          return reject(err)
        }
        if (info.statusCode === 200) {
          resolve(body)
        } else {
          reject(body)
        }
      })
    })
  }
}