module.exports = {
  getMedia: async (req, res) => {
    db = req.app.get('db');
    const { offset } = req.body;
    // gets array of posts w/o their images up to a max of ten offset by an amount specified in the front end
    const return10 = await db.media.get_all_posts([offset]);
    let return10Image = [];
    //adds the images to each post object as a single key/value pair "imageUrls: [ 'imageurl 1', 'imageurl 2', 'imageurl 3' ]"
    return10.forEach(async post => {
      let newPost = { ...post };
      const authorInfo = await db.get_author_info([post.user_id])
      newPost.authorInfo = authorInfo[0];
      const imageArr = await db.media.get_image_to_post([post.media_id]);
      let images = [];
      imageArr.forEach(image => {
        images.push(image.image_url);
      });
      newPost.imageUrls = images;
      return10Image.push(newPost);
      // async function won't wait for forEach to finish, so res.status needed to be inside forEach so it would fire last
      if (return10Image.length === return10.length) {
        res.status(200).send(return10Image);
      };
    });
  },
  getFirstMedia: async (req, res) => {
    db = req.app.get('db');
    const firstPost = await db.media.get_first_post();
    // reused getMedia forEach method since it is confirmed to work
    let firstPostImg = [];
    firstPost.forEach(async post => {
      let newPost = {...post};
      const authorInfo = await db.get_author_info([post.user_id])
      newPost.authorInfo = authorInfo[0];
      const imageArr = await db.media.get_image_to_post([post.media_id]);
      let images = [];
      imageArr.forEach(image => {
        images.push(image.image_url);
      });
      newPost.imageUrls = images;
      firstPostImg.push(newPost);
      if (firstPostImg.length === firstPost.length) {
        res.status(200).send(firstPostImg[0]);
      }
    });
  },
  postMedia: async (req, res) => {
    db = req.app.get('db');
    const { title, user_id, content, urlArr } = req.body;
    const mediaPostId = await db.media.add_post({ title, content, user_id });
    if (urlArr !== []) {
      urlArr.forEach(url => {
        db.add_image([url])
        .then(result => {
          db.media.add_media_image([mediaPostId[0].media_id, result[0].image_id])
        })
        .catch(err => {
          console.log(err)
        });
      });
    };
    res.status(201).send({ message: 'post created' });
  },
  editMedia: async (req, res) => {
    db = req.app.get('db');
    const { title, content } = req.body;
    const { media_id } = req.params;
    try {
      await db.media.change_media({ media_id, title, content })
    } catch (err) {
      return console.log(err)
    };
    res.status(200).send({ message: 'post edited' })
  },
  deleteMedia: async (req, res) => {
    const {media_id} = req.params;
    const imageIds = await db.media.get_image_ids([media_id]);
    await db.media.delete_mediapost_image([media_id]);
    imageIds.forEach(async el => {
      try {
        await db.delete_image([el.image_id])
      } catch (err) {
        return console.log(err)
      };
      
    });
    try {
      await db.media.delete_media([media_id]);
    } catch (err) {
      return console.log(err)
    };
    res.status(200).send ({ message: 'post deleted' })
  }
}