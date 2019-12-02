module.exports = {
  getEvents: async (req, res) => {
    db = req.app.get('db');
    const { offset } = req.body;
    // gets array of posts w/o their images up to a max of ten offset by an amount specified in the front end
    const return10 = await db.events.get_all_posts([offset]);
    let return10Image = [];
    //adds the images to each post object as a single key/value pair "imageUrls: [ 'imageurl 1', 'imageurl 2', 'imageurl 3' ]"
    return10.forEach(async post => {
      let newPost = { ...post }
      const imageArr = await db.events.get_image_to_post([post.event_id])
      let images = [];
      imageArr.forEach(image => {
        images.push(image.image_url)
      });
      newPost.imageUrls = images;
      return10Image.push(newPost);
      // async function won't wait for forEach to finish, so res.status needed to be inside forEach so it would fire last
      if (return10Image.length === return10.length) {
        res.status(200).send(return10Image)
      }
    })
  },
  postEvent: async (req, res) => {
    db = req.app.get('db');
    const { title, user_id, content, urlArr } = req.body;
    const eventPostId = await db.events.add_post({ title, content, user_id });
    if (urlArr !== []) {
      urlArr.forEach(url => {
        db.add_image([url])
          .then(result => {
            db.events.add_event_image([eventPostId[0].event_id, result[0].image_id])
          })
          .catch(err => {
            console.log(err)
          });
      });
    };
    res.status(201).send({ message: 'post created' });
  },
  editEvent: async (req, res) => {
    db = req.app.get('db');
    const { title, content } = req.body;
    const { event_id } = req.params;
    try {
      await db.events.change_event({ event_id, title, content })
    } catch (err) {
      return console.log(err)
    };
    res.status(200).send({ message: 'post edited' })
  },
  deleteEvent: async (req, res) => {
    db = req.app.get('db');
    const { event_id } = req.params;
    const imageIds = await db.events.get_image_ids([event_id]);
    await db.events.delete_eventpost_image([event_id]);
    imageIds.forEach(async el => {
      try {
        await db.delete_image([el.image_id])
      } catch (err) {
        return console.log(err)
      };
    });
    try {
      await db.events.delete_event([event_id]);
    } catch (err) {
      return console.log(err)
    };
    res.status(200).send({ message: 'post deleted' });
  }
}