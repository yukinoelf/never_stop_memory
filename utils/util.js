const util_time = require('./util_time.js')

let getFlag = (ctx, cb) => {
  let tableId = getApp().globalData.tableFlagId,
    Flags = new wx.BaaS.TableObject(tableId)

  Flags.find()
    .then(res => cb(res))
    .catch(err => console.dir(err))
}

let addPhoto = (ctx, cb) => {
  let tableId = getApp().globalData.tablePhotoId

  let Photo = new wx.BaaS.TableObject(tableId)
  let photo = Photo.create()
  let user_id = ctx.data.user.id
  let name = ctx.data.name
  let path = ctx.data.path
  let remark = ctx.data.remark
  let time = util_time.formatTime(new Date())

  let data = {
    user_id,
    name,
    path,
    remark,
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
  getFlag: getFlag,
  isEmptyObject: isEmptyObject,
  addPhoto: addPhoto,
}