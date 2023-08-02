export default function empteyBody(req, res, next) {
  if (!req.body || !req.files)
    return res.status(401).send('you have to insert data').end();

  next();
}
