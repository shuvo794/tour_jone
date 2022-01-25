import initializeAuthentication from "../Firebase/firebase.init";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useEffect, useState } from "react";

initializeAuthentication();
const useFirebase = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [adminLoading, setAdminLoading] = useState(true);
  const [admin, setAdmin] = useState(false);
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  // create a new user
  const createNewUser = ({ name, email, password }, location, history) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {})
          .catch((error) => {
            setError(error.message);
          });
        saveUserToDB(name, email);
        const destination = location?.state?.from;
        history.replace(destination || "/");
        setUser(user);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  // sign in a user with firebase authentication
  const singInUser = ({ email, password }, location, history) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        history.replace(location?.state?.from || "/home");
        const user = userCredential.user;
        setUser(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  // sing in with google authentication
  const singInWithGoogle = (history, location) => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setUser(result.user);
        history.replace(location?.state?.from || "/home");
      })
      .then((err) => setError(err?.message));
  };
  // sign out a user with firebase authentication
  const signOutUser = (history) => {
    signOut(auth)
      .then(() => {
        setUser({});
        history.replace("/home");
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  // observe the user
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setAdminLoading(true);
        fetch(`http://localhost:5000/users/${user?.email}`)
          .then((res) => res.json())
          .then((data) => setAdmin(data.admin))
          .finally(() => setAdminLoading(false));
      } else {
        setUser({});
      }
      setIsLoading(false);
    });
    return () => unSubscribe;
  }, [auth]);
  // save the registered use to the mongo database
  const saveUserToDB = (name, email) => {
    const user = { name, email };
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  return {
    createNewUser,
    singInUser,
    singInWithGoogle,
    signOutUser,
    setError,
    user,
    error,
    isLoading,
    admin,
    adminLoading,
  };
};
export default useFirebase;
