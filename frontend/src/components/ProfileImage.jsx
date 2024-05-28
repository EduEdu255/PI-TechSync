import { useState, useEffect, useContext } from "react";
import { api_image_base_url, postData } from "../Services/apiService";
import { LoginContext } from "../Services/LoginContext";
import Loading from "./Loading";
import SnackBar from './SnackBar.jsx';

function ProfileImage({ loggedUser }) {
  const { setLoggedUser } = useContext(LoginContext);
  const [changed, setChanged] = useState(0);
  const [processando, setProcessando] = useState(false);
  const [erro, setErro] = useState(null)

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      setProcessando(true);
      let endpoint = "auth/profile_pic";
      if(loggedUser['@type'] == 'CiaAerea'){
        endpoint = "cia_aerea/logo";
      }
      postData(endpoint, formData).then(
        () => {
          setChanged(changed + 1);
          setProcessando(false);
          event.target.files.value = null;
          setErro(null);
        },
        (err) => {
          setProcessando(false);
          console.log(err);
          event.target.files.value = null;
          setErro(err.response?.data?.message ?? 'Erro não informado');
        }
      );
    }
  };

  useEffect(() => {
    const user = sessionStorage.getItem("loggedUser");
    setLoggedUser(JSON.parse(user));
  }, [changed]);
  let property = loggedUser.profile_pic
  if(loggedUser['@type'] == 'CiaAerea'){
    property = loggedUser.logo
  }
  const url = property.includes("http")
    ? property
    : api_image_base_url + property + "?ts=" + Date.now();
  let urlHover = "";
  if (loggedUser["@type"] != "GoogleUser") {
    urlHover = "/images/camera.svg";
  }

  function clickImage() {
    const input = document.getElementById("imageSelect");
    if (input) {
      input.click();
    }
  }

  return (
    loggedUser && (
      <>
        {processando ? <Loading /> : null}
        {erro && <SnackBar message={erro} type="danger"/>}
        {loggedUser && loggedUser["@type"] != "GoogleUser" && <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          name="image"
          id="imageSelect"
        />}
        <div
          style={{
            "--image-url": `url(${url})`,
            "--image-url-hover": `url(${urlHover}), url(${url})`,
          }}
          className={`transition-all duration-300 ease-in-out rounded-full h-[250px] aspect-square bg-[image:var(--image-url)] bg-center bg-contain bg-no-repeat hover:bg-[image:var(--image-url-hover)] cursor-pointer`}
          onClick={clickImage}
        ></div>
      </>
    )
  );
}

export default ProfileImage;
