module.exports = {
  imgUpload: (req, res, next) => {
    const db = req.app.get("db");
    const { id } = req.params;
    if (req.files === null) {
      return res.status(400).json({ msg: "No File Uploaded" });
    }

    const file = req.files.file;
    file.mv(__dirname + "/../build/uploads/" + id + file.name, err => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      db.insert_profile_photo([`./uploads/${id}${file.name}`, id]);
      res.json({
        fileName: file.name,
        filePath: `./uploads/${id}${file.name}`
      });
    });
  },
  getProfilePhoto: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    try {
      const result = await db.get_profile_photo([id]);
      console.log(result);
      res.status(200).send(result[0].profile_image);
    } catch (err) {
      console.log(err);
    }
  }
};
