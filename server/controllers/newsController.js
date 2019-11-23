module.exports = {
  getnews: async (req, res) => {
    db = req.app.get('db');
    const {offset} = req.body;
    const return10 = await db.news.get_all_posts([offset]);
    console.log(return10);
    res.status(200).send({posts: return10});
  },
  postNews: async (req, res) => {
    db = req.app.get('db');
    const {title, content, urlArr} = req.body;
    const newsPostId = await db.news.add_post([title, content]);
    if (urlArr) {
      urlArr.forEach(url => {
        const imageId = await db.add_image([url]);
        db.news.add_news_image([newsPostId[0].newsPostId, imageId[0].imageId]);
      });
    };
    res.status(201).send({message: 'post created'});
  },
  editNews: async (req, res) => {
    db = req.app.get('db');
    const {title, content} = req.body;
    
  },
  deleteNews: async (req, res) => {

  }
}