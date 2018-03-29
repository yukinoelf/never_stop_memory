const util_time = require('./util_time.js')

let getPhotos = (ctx, cb) => {
  let tableId = getApp().globalData.tablePhotoId,
    Glarry = new wx.BaaS.TableObject(tableId)

  let query = new wx.BaaS.Query()
  let userInfo = getApp().globalData.userInfo
  let user_id = userInfo.id
  query.contains('user_id', user_id)

  Glarry.setQuery(query).find()
    .then(res => cb(res))
    .catch(err => console.dir(err))
}

let addPhoto = (ctx, cb) => {
  let tableId = getApp().globalData.tablePhotoId,
  userInfo = getApp().globalData.userInfo

  let Photo = new wx.BaaS.TableObject(tableId),
  photo = Photo.create()

  let user_id = userInfo.id,
  name = ctx.data.name,
  path = ctx.data.path,
  remark = ctx.data.remark,
  position = ctx.data.position,
  record = ctx.data.recordPath

  let time = util_time.formatTime(new Date())

  let data = {
    user_id,
    name,
    path,
    remark,
    position,
    time,
    record
  }

  photo.set(data)
    .save()
    .then(res => cb(res))
    .catch(err => console.dir(err))
}

let updatePhoto = (ctx, cb) => {
  console.log(ctx.data.recordPath)
  let tableId = getApp().globalData.tablePhotoId,
    recordId = ctx.data.id,
    name = ctx.data.name,
    path = ctx.data.path,
    remark = ctx.data.remark,
    position = ctx.data.position,
    record = ctx.data.recordPath

  let Photos = new wx.BaaS.TableObject(tableId),
    Photo = Photos.getWithoutData(recordId)

  let data = {
    name,
    path,
    remark,
    position,
    record
  }

  Photo.set(data)
    .update()
    .then(res => cb(res))
    .catch(err => console.dir(err))
}

let deletePhoto = (ctx, cb) => {
  let tableId = getApp().globalData.tablePhotoId,
    recordId = ctx.data.id

  let Photos = new wx.BaaS.TableObject(tableId)

  Photos.delete(recordId)
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
  updatePhoto: updatePhoto,
  deletePhoto: deletePhoto
}