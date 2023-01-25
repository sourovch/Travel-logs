import { logs } from '../models/logs.js';
import fs from 'fs';

export async function getLogs(req, res) {
  try {
    const data = await logs.find({});

    if (data.length <= 0)
      return res.status(404).send('There is nothing Hear');

    res.send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send('somthing went wrong');
  }
}

export async function getSingleLog(req, res) {
  const { id } = req.params;

  try {
    const data = await logs.findById(id);
    if (!data) return res.send('not found').status(404);

    res.send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
}

export async function getFiles(req, res) {
  const { fileName } = req.params;

  res.sendFile(
    './uploads/' + fileName,
    { root: '../server' },
    (err) => {
      if (err) {
        console.log(err);
        res.status(404).send('nothing is hare').end();
        return;
      }
    }
  );
}

export async function createLogs(req, res) {
  const data = req.body;

  const filesPaths = req.files.map((i) => {
    const obj = {
      fileUrl: `${req.protocol}://${req.get('host')}${
        req.originalUrl.split('/')[0]
      }/files/${i.filename}`,
      fileName: i.filename,
    };
    return obj;
  });

  try {
    await logs.create({ ...data, photos: filesPaths });

    const response = await logs.find({});

    res.send(response);
  } catch (err) {
    console.log(err);
    res.status(500).send('somthing went wrong');
  }
}

export async function deletLog(req, res) {
  const { id } = req.params;

  try {
    const data = await logs.findById(id);
    const photos = data.photos;

    photos.forEach((i) => {
      fs.unlink('./uploads/' + i.fileName, (err) => {
        if (err) {
          console.log(err);
          res
            .status(500)
            .send('somthing is wrong while delating file')
            .end();
        }
      });
    });

    await data.remove();

    res.send('delated');
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
}

export async function editLog(req, res) {
  const { id } = req.params;
  const formData = req.body;
  const formFiles = req.files;
  try {
    const data = await logs.findById(id);

    if (!data) return res.status(404).send('not found');

    const prevPhotos = data.photos;
    const delateList =
      typeof formData.delateList === 'string'
        ? [formData.delateList]
        : formData.delateList;

    let updatedPhotos = [];
    if (!!delateList) {
      updatedPhotos = prevPhotos.filter((i) => {
        return delateList.indexOf(i.fileName) === -1;
      });

      delateList.forEach((i) => {
        fs.unlink('./uploads/' + i, (err) => {
          if (err) {
            console.log(err);
            res
              .status(500)
              .send('somthing went wrong(while delating photo)')
              .end();
            return;
          }
        });
      });
    } else {
      updatedPhotos = prevPhotos;
    }

    const newPhotos = formFiles.map((i) => {
      return {
        fileUrl: `${req.protocol}://${req.get('host')}/${
          req.originalUrl.split('/')[0]
        }files/${i.filename}`,
        fileName: i.filename,
      };
    });

    await data.updateOne({
      ...formData,
      photos: [...updatedPhotos, ...newPhotos],
    });
    res.send('done');
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
}

export async function authPost(req, res) {
  const { id, userName, editPassword } = req.body;

  try {
    const log = await logs.findById(id);
    if (!log) return res.status(404).send('not found');

    if (
      userName !== log.userName ||
      editPassword !== log.editPassword
    ) {
      console.log(userName, log.userName);
      console.log(editPassword, log.editPassword);
      res.status(401).send('id or password is wrong');
      return;
    }

    res.send('Autorized');
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
}
