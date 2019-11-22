const bcrypt = require('bcryptjs');

module.exports = {
  register: async (req, res) => {
    const db = req.app.get('db');
    const { email, username, password } = req.body;
    const foundUsername = await db.find_user_by_username([username]);
    const foundEmail = await db.find_email([email]);
    if (+foundEmail[0].count !== 0) {
      return res.status(409).send({ message: 'Email already registered to a user' })
    }
    if (+foundUsername[0].count !== 0) {
      return res.status(409).send({ message: 'Username taken' });
    };
    const image_id = await db.add_image([`https://robohash.org/${username}`]);
    const profile_pic = await db.get_image_by_id([image_id[0].image_id])
    const { image_url } = profile_pic[0].image_url;
    const user_id = await db.register_user({ username, image_id: image_id[0].image_id });
    db.add_email({ email, facebook: '', twitch: '', twitter: '', discord: '', user_id: user_id[0].user_id });
    const salt = bcrypt.genSaltSync(11);
    const hash = bcrypt.hashSync(password, salt);
    db.add_hash([hash, user_id[0].user_id]);
    db.add_authority([false, false, false, false, user_id[0].user_id]);
    req.session.user = { user_id: user_id[0].user_id, username, profile_pic: image_url };
    res.status(201).send({ message: 'logged in', user: req.session.user });
  },
  makeProfile: async (req, res) => {
    const db = req.app.get('db');
    const { user_id, username, image_url, discord, facebook, twitch, twitter } = req.body;
    const foundUsername = await db.username_finder([user_id, username]);
    if (+foundUsername[0].count !== 0) {
      return res.status(409).send({ message: 'Username taken' });
    };
    const findImage = await db.get_user_by_user_id([user_id]);
    const { image_id } = findImage[0];
    db.update_image_url([image_id, image_url]);
    if (username !== findImage[0].username) {
      db.update_username([user_id, username]);
    };
    db.set_userlinks([user_id, discord, facebook, twitch, twitter]);
    req.session.user = { user_id, username, image_url };
    res.status(202).send({ message: 'updated info', user: req.session.user });
  },
  login: async (req, res) => {
    const db = req.app.get('db');
    const { username, password } = req.body;
    const found = await db.find_user_by_username([username]);
    if (+found[0].count === 0) {
      return res.status(401).send({ message: 'Incorrect username or password' });
    };
    const userinfo = await db.find_user_hash([username]);
    const { hash, user_id, image_url } = userinfo[0];
    const result = bcrypt.compareSync(password, hash);
    if (!result) {
      return res.status(401).send({ message: 'Incorrect username or password' });
    };
    req.session.user = { user_id, username, image_url }
    res.status(200).send({ message: 'logged in', user: req.session.user })
  },
  getInfo: async (req, res) => {
    const db = req.app.get('db');
    const { user_id } = req.params;
    const allUserInfo = await db.get_user_info([user_id]);
    const { username, image_url, email, discord, twitch, facebook, twitter } = allUserInfo[0];
    res.status(200).send({ username, user_id, image_url, email, discord, twitter, twitch, facebook });
  },
  editProfile: async (req, res) => {
    const db = req.app.get('db');
    const {username, image_url, email, discord, twitter, facebook, twitch } = req.body;
    const {user_id} = req.params;
    //Check if this works
    const foundUsername = await db.username_finder([user_id, username]);
    const foundEmail = await db.email_finder([user_id, email]);
    if (+foundUsername[0].count !== 0) {
      return res.status(409).send({ message: 'Username taken' });
    };
    if (+foundEmail[0].count !== 0) {
      return res.status(409).send({ message: 'Email already registered to a user' })
    }
    // Good past here
    const currinfo = await db.get_user_info([user_id]);
    if (username !== currinfo[0].username) {
      db.update_username([user_id, username]);
    };
    if (image_url !== currinfo[0].image_url) {
      db.update_image_url([currinfo[0].image_id, image_url]);
    };
    if (email !== currinfo[0].email || discord !== currinfo[0].discord || twitter !== currinfo[0].twitter || facebook !== currinfo[0].facebook || twitch !== currinfo[0].twitch) {
      db.update_userlinks({user_id, email, discord, twitter, facebook, twitch});
    };
    req.session.user = {user_id, username, image_url};
    res.status(202).send({message: 'profile updated', user: req.session.user});
  },
  updatePassword: async (req, res) => {
    const db = req.app.get('db');
    const {password, newPassword} = req.body;
    const {user_id} = req.params;
    const hashInfo = await db.find_hash([user_id]);
    const {hash} = hashInfo[0];
    const result = bcrypt.compareSync(password, hash);
    if (!result) {
      return res.status(401).send({ message: 'Incorrect username or password' });
    };
    const salt = bcrypt.genSaltSync(11);
    const newHash = bcrypt.hashSync(newPassword, salt);
    db.update_hash([user_id, newHash]);
    res.status(202).send({message: 'password updated successfully'});
  },
  logout: (req, res) => {
    req.session.destroy();
    res.status(200).send({message: 'logged out'})
  }
};