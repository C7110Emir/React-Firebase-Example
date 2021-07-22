import { database, storage } from "./firebase";
import firebase from "./firebase";
import { toast } from "react-toastify";

export const deleteSingle = (id, history, setAllPosts) => {
  database
    .collection("posts")
    .doc(id)
    .delete()
    .then(() => {
      history.push("/");
      toast.info("Document successfully deleted!");
      getAllPosts(setAllPosts);
    })
    .catch((error) => {
      toast.error("Error removing document: " + error);
    });
};

export const getSinglePost = (id, setSingle, setTitle, setContent) => {
  var docRef = database.collection("posts").doc(id);

  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        if (setTitle) {
          let info = doc.data();
          setTitle(info.title);
          setContent(info.content);
        } else {
          setSingle(doc.data());
        }
      } else {
        // doc.data() will be undefined in this case
        toast.warning("No such document!");
      }
    })
    .catch((error) => {
      toast.error("Error getting document: " + error);
    });
};

export const getAllPosts = async (setAllPosts) => {
  const tempDoc = [];

  await database
    .collection("posts")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        tempDoc.push({ id: doc.id, ...doc.data() });
      });
    });
  setAllPosts(tempDoc);
};

export const uploadPost = (info, image, history, setAllPosts) => {
  if (image.name) {
    const storageRef = storage.ref();
    var uploadTask = storageRef.child("images/" + image.name).put(image);

    uploadTask.on(
      firebase.storage.TaskEvent.state_changed, // or 'state_changed'
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        toast.warning("Upload is " + progress + "% done");
      },
      (error) => {
        toast.error(error);
      },
      async () => {
        // Upload completed successfully, now we can get the download URL
        await uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          info.imageUrl = downloadURL;
          toast.success("Your image is successfully saved to the storage!");
        });

        database
          .collection("posts")
          .add(info)
          .then(() => {
            history.push("/");
            toast.success("Your post successfully written into firestore");
            getAllPosts(setAllPosts);
          })
          .catch((error) => {
            toast.error("Error writing document: " + error);
          });
      }
    );
  } else {
    database
      .collection("posts")
      .add(info)
      .then(() => {
        history.push("/");
        toast.success("Your post successfully written into firestore");
        getAllPosts(setAllPosts);
      })
      .catch((error) => {
        toast.error("Error writing document: " + error);
      });
  }
};

export const updatePost = (info, image, id, history, setAllPosts) => {
  if (image) {
    const storageRef = storage.ref();
    var uploadTask = storageRef.child("images/" + image.name).put(image);

    uploadTask.on(
      firebase.storage.TaskEvent.state_changed, // or 'state_changed'
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        toast.warning("Upload is " + progress + "% done");
      },
      (error) => {
        console.log(error);
      },
      async () => {
        // Upload completed successfully, now we can get the download URL
        await uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          info.imageUrl = downloadURL;
          toast.info("File available at " + downloadURL);
        });

        database
          .collection("posts")
          .doc(id)
          .set(info, { merge: true })
          .then(() => {
            history.push("/");
            getAllPosts(setAllPosts);
            toast.success("Document successfully updated!");
          })
          .catch((error) => {
            toast.error("Error writing document: " + error);
          });
      }
    );
  } else {
    database
      .collection("posts")
      .doc(id)
      .set(info, { merge: true })
      .then(() => {
        history.push("/");
        getAllPosts(setAllPosts);
        toast.success("Document successfully updated!");
      })
      .catch((error) => {
        toast.error("Error writing document: " + error);
      });
  }
};
