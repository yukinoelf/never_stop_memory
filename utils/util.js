const util_time = require('./util_time.js')

let getPhotos = (ctx, cb) => {
  let tableId = getApp().globalData.tablePhotoId,
    Glarry = new wx.BaaS.TableObject(tableId)

  Glarry.find()
    .then(res => cb(res))
    .catch(err => console.dir(err))
}

let addPhoto = (ctx, cb) => {
  let tableId = getApp().globalData.tablePhotoId
  let userInfo = getApp().globalData.userInfo

  let Photo = new wx.BaaS.TableObject(tableId)
  let photo = Photo.create()
  let user_id = userInfo.id
  let name = ctx.data.name
  let path = ctx.data.path
  let remark = ctx.data.remark
  let position = ctx.data.position
  let time = util_time.formatTime(new Date())

  let data = {
    user_id,
    name,
    path,
    remark,
    position,
    time
  }

  photo.set(data)
    .save()
    .then(res => cb(res))
    .catch(err => console.dir(err))
}

function isEmptyObject(e) {
  var t;
  for (t in e)
    return !1;
  return !0
}

module.exports = {
  getPhotos: getPhotos,
  isEmptyObject: isEmptyObject,
  addPhoto: addPhoto,
}