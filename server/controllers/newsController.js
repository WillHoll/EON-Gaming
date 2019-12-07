module.exports = {
  getNews: async (req, res) => {
    db = req.app.get('db');
    const { offset } = req.body;
    //gets array of posts w/o their images up to a max of ten offset by an amount specified in the front end
    const return10 = await db.news.get_all_posts([offset]);
    let return10Image = []
    const thisfn = () => {
      //adds the images to each post object as a single key/value pair "imageUrls: ['imageurl 1', 'imageurl 2', 'imageurl 3']"
      return10.forEach(async post => {
        let newPost = { ...post }
        const imageArr = await db.news.get_image_to_post([post.news_id])
        let images = [];
        imageArr.forEach(image => {
          images.push(image.image_url)
        });
        newPost.imageUrls = images
        return10Image.push(newPost)
        // async function won't wait for forEach to finish, so res.status needed to be inside forEach in order to fire last
        if (return10Image.length === return10.length) {
          res.status(200).send(return10Image)
        }
      });
    }
    thisfn();
  },
  getFirstNews: async (req, res) => {
    db = req.app.get('db');
    const firstPost = await db.news.get_first_post()
    // reused previous function because I knew it worked and didn't have time to test another method
    let firstPostImg = [];
    firstPost.forEach(async post => {
      let newPost = { ...post };
      const imageArr = await db.news.get_image_to_post([post.news_id]);
      let images = [];
      imageArr.forEach(image => {
        images.push(image.image_url);
      });
      newPost.imageUrls = images
      firstPostImg.push(newPost)
      if (firstPostImg.length === firstPost.length) {
        res.status(200).send(firstPostImg[0])
      }
    })

  },
  postNews: async (req, res) => {
    db = req.app.get('db');
    const { title, content, urlArr } = req.body;
    try {
      var newsPostId = await db.news.add_post([title, content]);
    } catch (err) {
      res.status(400).send(err)
    }
    if (urlArr !== []) {
      urlArr.forEach(url => {
        db.add_image([url])
          .then(result => {
            db.news.add_news_image([newsPostId[0].news_id, result[0].image_id]);
          })
          .catch(err => {
            res.status(500).send(err)
          });
      });
    };
    res.status(201).send({ message: 'post created' });
  },
  editNews: async (req, res) => {
    db = req.app.get('db');
    const { title, content } = req.body;
    const { news_id } = req.params;
    try {
      await db.news.change_news({ news_id, title, content })
    } catch (err) {
      return console.log(err)
    };
    res.status(200).send({ message: 'post edited' });
  },
  deleteNews: async (req, res) => {
    db = req.app.get('db');
    const { news_id } = req.params;
    const imageIds = await db.news.get_image_ids([news_id]);
    await db.news.delete_newspost_image([news_id]);
    imageIds.forEach(async el => {
      try{
        await db.delete_image([el.image_id])
      } catch (err) {
        return console.log(err)
      };
    });
    try {
      await db.news.delete_news([news_id])
    } catch (err) {
      return console.log(err)
    };
    res.status(200).send({ message: 'post deleted' });
  }
}