import * as dao from "./dao.js";

export default function LikesRoutes(app) {
    const likeAlbum = async (req, res) => {
        try {
            const currentUser = req.session["currentUser"];
            const album = req.body;
            const userId = currentUser._id;
            await dao.userLikesAlbum(userId, album);
            res.send("Liked");
        } catch (e) {
            console.log("Error liking album: " + e);
            res.status(400).send("Error liking album");
        }
    };

    const unLikeAlbum = async (req, res) => {
        try {
            const currentUser = req.session["currentUser"];
            const userId = currentUser._id;
            const albumId = req.params.albumId;
            await dao.userUnlikesAlbum(userId, albumId);
            res.send("Unliked");
        } catch (e) {
            console.log("Error unliking album: " + e);
            res.status(400).send("Error unliking album");
        }
    };

    app.post("/api/likes", likeAlbum);
    app.delete("/api/likes/:albumId", unLikeAlbum);
}