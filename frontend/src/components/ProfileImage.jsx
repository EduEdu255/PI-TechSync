import { useState, useEffect, useContext } from "react";
import { api_image_base_url, postData } from "../Services/apiService";
import { LoginContext } from "../Services/LoginContext";
import Loading from "./Loading";

function ProfileImage({ loggedUser }) {
  const { setLoggedUser } = useContext(LoginContext);
  const [changed, setChanged] = useState(0);
  const [processando, setProcessando] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      setProcessando(true);
      postData("auth/profile_pic", formData).then(
        () => {
          setChanged(changed + 1);
          setProcessando(false);
          event.target.files.value = null;
        },
        (err) => {
          setProcessando(false);
          console.log(err);
          event.target.files.value = null;
        }
      );
    }
  };

  useEffect(() => {
    const user = sessionStorage.getItem("loggedUser");
    setLoggedUser(JSON.parse(user));
  }, [changed]);

  const url = loggedUser.profile_pic.includes("http")
    ? loggedUser.profile_pic
    : api_image_base_url + loggedUser.profile_pic + "?ts=" + Date.now();
  let urlHover = "";
  if (loggedUser["@type"] == "User") {
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
        {loggedUser && loggedUser["@type"] == "User" && <input
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
          className={`rounded-full h-[250px] aspect-square object-cover bg-[image:var(--image-url)] bg-cover bg-no-repeat hover:bg-[image:var(--image-url-hover)] cursor-pointer`}
          onClick={clickImage}
        ></div>
      </>
    )
  );
}

export default ProfileImage;
