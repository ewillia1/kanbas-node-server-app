import albumModel from "./model.js";

export const findAllAlbums = albumModel.find();
export const findAlbumById = (id) => albumModel.findById(id);
export const findAlbumByAlbumId = (albumId) => albumModel.findOne({ albumId });
export const createAlbum = (album) => albumModel.create(album);
export const updateAlbum = (albumId, album) => albumModel.updateOne({ albumId }, { $set: album });
export const deleteAlbum = (albumId) => albumModel.deleteOne({ albumId });