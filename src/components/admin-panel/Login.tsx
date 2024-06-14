import { signIn } from 'next-auth/react';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaGithub } from "react-icons/fa";

const Login = () => {
  return (
    <div className="bg-black min-h-screen grid place-items-center border">
      <form className="rounded-lg shadow-md border border-gray-700 p-4 flex flex-col gap-4">
        <h3 className='text-white text-center font-bold'>Sign In to Kairos Admin</h3>
        <button type="button" className="bg-white px-8 py-4 flex gap-2 items-center rounded-md hover:bg-gray-100" onClick={() => signIn("google")}>
          <FcGoogle size={30} />
          Sign In with Google
        </button>

        <button type="button" className="bg-white px-8 py-4 flex gap-2 items-center rounded-md hover:bg-gray-100" onClick={() => signIn("github")}>
          <FaGithub size={30} />
          Sign In with GitHub
        </button>

        <button type="button" className="bg-white px-8 py-4 flex gap-2 items-center rounded-md hover:bg-gray-100" onClick={() => signIn("github")}>
          <FaFacebook size={30} />
          Sign In with Facebook
        </button>
      </form>
    </div>
  );
};

export default Login;
