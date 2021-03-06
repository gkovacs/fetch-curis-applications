// Generated by LiveScript 1.5.0
(function(){
  var yamlfile, jsonfile, co, request, cfy, cookie, existing_applications, application_ids, res$, i$, ref$, len$, x, cookies, cookie_jar, k, v, cur_cookie, cur_url, options, get_url, get_json;
  yamlfile = require('yamlfile');
  jsonfile = require('jsonfile');
  co = require('co');
  request = require('request');
  cfy = require('cfy');
  cookie = require('cookie');
  existing_applications = jsonfile.readFileSync('applications_summary.json');
  res$ = [];
  for (i$ = 0, len$ = (ref$ = existing_applications.applications).length; i$ < len$; ++i$) {
    x = ref$[i$];
    res$.push(x.id);
  }
  application_ids = res$;
  cookies = yamlfile.readFileSync('cookies.yaml');
  cookie_jar = request.jar();
  for (k in cookies) {
    v = cookies[k];
    cur_cookie = request.cookie(cookie.serialize(k, v));
    cur_url = 'https://curis.stanford.edu';
    cookie_jar.setCookie(cur_cookie, cur_url);
  }
  options = {
    jar: cookie_jar,
    Host: 'curis.stanford.edu',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:53.0) Gecko/20100101 Firefox/53.0',
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Accept-Encoding': 'gzip, deflate, br',
    Connection: 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
    'Cache-Control': 'max-age=0'
  };
  get_url = cfy(function*(url){
    var new_options, res$, k, ref$, v;
    res$ = {};
    for (k in ref$ = options) {
      v = ref$[k];
      res$[k] = v;
    }
    new_options = res$;
    new_options.url = url;
    return (yield function(callback){
      return request(new_options, function(err, res, body){
        return callback(err, body);
      });
    });
  });
  get_json = cfy(function*(url){
    var res;
    res = (yield get_url(url));
    return JSON.parse(res);
  });
  co(function*(){
    var output, i$, ref$, len$, application_id, x;
    output = [];
    for (i$ = 0, len$ = (ref$ = application_ids).length; i$ < len$; ++i$) {
      application_id = ref$[i$];
      x = (yield get_json('https://curis.stanford.edu/protected/index.php/curis/get_application_details/' + application_id));
      output.push(x.data);
    }
    return jsonfile.writeFileSync('applications.json', output, {
      spaces: 2
    });
  });
}).call(this);
