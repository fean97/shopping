import { ref } from "vue";
import { projectAuth } from "../firebase/config";

const error = ref(null);
const isPending = ref(false);

const signup = async (email, password) => {
  error.value = null;
  isPending.value = true;
  try {
    const res = await projectAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    if (!res) {
      throw new Error("Could not complete signup");
    }
    isPending.value = false;
    error.value = null;

    return res;
  } catch (err) {
    console.log(err.message);
    isPending.value = false;
    error.value = err.message;
  }
};

const useSignup = () => {
  return { isPending, error, signup };
};

export default useSignup;
