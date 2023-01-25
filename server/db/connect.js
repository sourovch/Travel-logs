import mongoose from 'mongoose';

export default function connect(uri, fn) {
  mongoose
    .connect(uri)
    .then((t) => {
      console.log('connected to mongodb');
      fn();
    })
    .catch((err) => console.log(err.message));
}
