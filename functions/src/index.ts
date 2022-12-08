import * as functions from "firebase-functions";
const cors = require("cors")({origin: true})
const fs = require("fs")
const uuid = require("uuid-v4")
const {Storage} = require ("@google-cloud/storage")

const storage = new Storage({
  projectId: "salvaguarda-teste",
  keyFilename: "salvaguarda-teste.json",

});

export const uploadImage = functions.https.onRequest(
  (request: functions.https.Request, response: functions.Response) => {

  cors(request, response, () => {
    try {
      fs.writeFileSync('/tmp/imageToSave.jpg', request.body.image, 'base64');

      const bucket = storage.bucket('salvaguarda-teste.appspot.com');
      const id = uuid();
      bucket.upload('/tmp/imageToSave.jpg', {
        uploadType: 'media',
        destination: `/posts/${id}.jpg`,
        metadata: {
          metadata: {
            contentType: 'image/jpeg',
            firebaseStorageDownloadTokens: id
          }
        }
      }, (err: Error | null, file: File) => {
        if(err) {
                console.log(err);
                return response.status(500).json( { error: err } );
        } else {
                const fileName = encodeURIComponent(file.name);
                const imageUrl = 'https://firebasestorage.googleapis.com/v0/b/'
                    + bucket.name + '/o/' + fileName + '?alt=media&token=' + id;
                return response.status(201).json( { imageUrl:imageUrl } );
        }
      })
    } catch (err) {
      return response.status(500).json({ error: err });
    }
  })
});
