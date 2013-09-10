var request = require ('request'),
	Instagram  = require('instagram-node-lib');

Instagram.set('client_id', 'dd075d10031b4460ae5767d5ff871ae3');
Instagram.set('client_sectret', 'eef0975ca76b462b8f5c5c4ab02f66f2');

Instagram.getImagesByTag = function(tag, callback) {
  return Instagram.tags.recent({
    name: tag,
    complete: function(data, pagination) {
      var link;
      link = pagination.next_url;
      return request(link, function(error, response, body) {
        var last;
        if (!error && response.statusCode === 200) {
          last = JSON.parse(body).data;
          data = data.concat(last);
          return callback(data);
        } else {
          return callback([]);
        }
      });
    },
    error: function(errorMessage, errorObject, caller) {
      console.log(errorMessage);
      return callback([]);
    }
  });
};
exports.insta = function(req, res){
  var data, tag;
  tag = req.params.tag || "";
  return data = Instagram.getImages ByTag(tag, function(data) {
    return res.render('index', {
      title: "" + tag,
      data: data
    });
  });
}
