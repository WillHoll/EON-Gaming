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
  postNews: async (req, res) => {
    db = req.app.get('db');
    const { title, content, urlArr } = req.body;
    const newsPostId = await db.news.add_post([title, content]);
    if (urlArr !== []) {
      urlArr.forEach(url => {
        db.add_image([url])
          .then(result => {
            db.news.add_news_image([newsPostId[0].news_id, result[0].image_id]);
          })
          .catch(err => {
            console.log(err)
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
      db.news.change_news({ news_id, title, content })
    } catch (err) {
      return console.log(err)
    };
    res.status(200).send({ message: 'post edited' });
  },
  deleteNews: async (req, res) => {
    db = req.app.get('db');
    const { news_id } = req.params;
    try {
      db.news.delete_news([news_id]);
    } catch (err) {
      return console.log(err)
    };
    res.status(200).send({ message: 'post deleted' })
  }
}