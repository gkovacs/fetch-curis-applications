require! {
  yamlfile
  jsonfile
  co
  request
  cfy
  cookie
}

existing_applications = jsonfile.readFileSync 'applications_summary.json'
application_ids = [x.id for x in existing_applications.applications]

cookies = yamlfile.readFileSync 'cookies.yaml'
cookie_jar = request.jar()
for k,v of cookies
  cur_cookie = request.cookie(cookie.serialize(k, v))
  cur_url = 'https://curis.stanford.edu'
  cookie_jar.setCookie(cur_cookie, cur_url)

options = {
  jar: cookie_jar
  Host: 'curis.stanford.edu'
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:53.0) Gecko/20100101 Firefox/53.0'
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
  'Accept-Language': 'en-US,en;q=0.5'
  'Accept-Encoding': 'gzip, deflate, br'
  Connection: 'keep-alive'
  'Upgrade-Insecure-Requests': '1'
  'Cache-Control': 'max-age=0'
}

get_url = cfy (url) ->*
  new_options = {[k,v] for k,v of options}
  new_options.url = url
  yield (callback) ->
    request new_options, (err, res, body) ->
      callback(err, body)

get_json = cfy (url) ->*
  res = yield get_url(url)
  return JSON.parse res

co ->*
  output = []
  for application_id in application_ids
    x = yield get_json 'https://curis.stanford.edu/protected/index.php/curis/get_application_details/' + application_id
    output.push x.data
  jsonfile.writeFileSync('applications.json', output, {spaces: 2})
