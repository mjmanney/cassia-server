var notFound = (req, res) => {
  var url = req.url
  res.status(404).send(url + ' - 404 NOT FOUND')
}

module.exports= notFound
