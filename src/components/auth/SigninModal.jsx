import { Fragment, useEffect, useRef, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../../contexts/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import RingLoader from "../RingLoader";
import Modal from "../Modal";
import { IonIcon } from "@ionic/react";
import { eyeOffOutline, eyeOutline } from "ionicons/icons";

export default function SigninModal({ show, hide }) {
  const { user, setUser } = useAuthContext();
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const [error, setError] = useState("");
  
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [sending, setSending] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  function handleInput(e) {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function resetInput() {
    setInput({
      email: "",
      password: "",
    });
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (sending) return;

    error && setError("");

    if (!input.email.trim().length || !input.password.trim().length) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    const user = { email: input.email, password: input.password };

    setSending(true);
    try {
      const result = await axios.post("/login", user);

      console.log(result);

      localStorage.setItem("ELCAMBA_token", result?.data?.token);

      setUser(result.data);
      console.log(result.data);
      if(result.data?.accessId == 3) {
        navigate("/admin");
      }
      hide();
      setSending(false);
    } catch (err) {
      setSending(false);
      const message = err.response?.data;
      if (message === "user not found") {
        setError("Cet email n'est pas associé à un compte");
        return;
      }

      if (message === "password incorrect") {
        setError("Mot de passe incorrecte");
        return;
      }

      if (message === "suspended") {
        setError("Compte suspendu, contactez nous pour plus d'informations");
        return;
      }

      setError("Une erreur s'est produite");
    }
  }

  return (
    <Modal show={show} hide={hide} initialFocusRef={emailRef} afterLeave={() => resetInput()}>
      <button
        type="button"
        onClick={() => {
          hide();
        }}
        className="absolute top-4 right-4"
      >
        <XMarkIcon className="block h-8 w-8 text-black" aria-hidden="true" />
      </button>
      <header>
        <Link className="flex justify-center items-center gap-1" to="/">
          JWT AUTH
        </Link>
        <h3 className="mt-4 font-semibold text-center text-2xl text-black">Connectez-vous</h3>
      </header>
      <form className="mt-10" onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          type="email"
          name="email"
          onChange={handleInput}
          value={input.email}
          className="w-full py-3 pl-4 pr-11 rounded-xl text-slate-900 text-xl outline-none focus:ring-2 focus:ring-cyan-300 border border-slate-300 font-rubik"
          ref={emailRef}
        />
        <div className="relative mt-2">
          <input
            placeholder="Mot de passe"
            type={passwordVisible ? "text" : "password"}
            name="password"
            onChange={handleInput}
            value={input.password}
            className="w-full py-3 pl-4 pr-11 rounded-xl text-slate-900 text-xl outline-none focus:ring-2 focus:ring-cyan-300 border border-slate-300 font-rubik"
          />
          <i
            className="absolute top-1/2 -translate-y-1/2 right-4 flex items-center justify-center cursor-pointer"
            onClick={() => setPasswordVisible((visibility) => !visibility)}
          >
            {passwordVisible ? <IonIcon icon={eyeOutline} className="text-2xl" /> : <IonIcon icon={eyeOffOutline} className="text-2xl" />}
          </i>
        </div>
        {error && (
          <div className="mt-2 py-3 px-4 rounded-xl text-red-500 bg-red-100 border border-red-500 w-full flex items-center gap-4">
            <FontAwesomeIcon icon={faExclamationTriangle} size="lg" fill="red" />
            {error}
          </div>
        )}
        <div className="relative mt-6">
          <input
            type="submit"
            value="Se connecter"
            className="w-full p-3 rounded-full bg-blue-500 hover:bg-blue-600 font-medium text-xl text-white cursor-pointer transition duration-300"
          />
          {sending ? (
            <i className="absolute right-2 top-1/2 -translate-y-1/2">
              <RingLoader color="white" />
            </i>
          ) : (
            ""
          )}
        </div>
        <div className="flex justify-between px-3">
          <Link to="/reset-password" className="text-blue-500 hover:underline">
            Mot de passe oublié ?
          </Link>
          <Link to="/register" className="text-blue-500 hover:underline">
            S'inscrire
          </Link>
        </div>
        <div className="relative mx-4 mt-5">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[1px] bg-slate-900"></div>
          <h3 className="relative z-10 w-fit mx-auto px-2 bg-white font-medium text-lg text-center text-slate-900 capitalize">ou</h3>
        </div>
      </form>
    </Modal>
  );
}
