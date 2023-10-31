import axios from "axios";
import React, { useState } from "react";

export default function AddPost() {
  const [caption, setCaption] = useState("");

  const [media, setMedia] = useState();
  let mediaData = new FormData();

  const handleChange = (e) => {
    setCaption(e.target.value);
  };
  const handleChangeMedia = (e) => {
    setMedia(e.target.files[0]);
  };

  const submit = async () => {
    // mediaData.append("caption", caption);
    // mediaData.append("user_id", localStorage.getItem("userid"));
    //upload the meida file first
    mediaData.append("file", media);
    const uploadresp = await axios.post(
      "https://api.bytescale.com/v2/accounts/W142iJA/uploads/form_data",
      mediaData,
      {
        headers: {
          Authorization: "Bearer public_W142iJA9nSM4wceThbziM953umKY",
        },
      }
    );

    const fileUrl = uploadresp.data.files[0].fileUrl;

    const res = await axios.post(
      "http://localhost:8080/posts/addpost",
      { caption: caption, fileUrl: fileUrl },

      { headers: { Authorization: localStorage.getItem("userid") } }
    );

    console.log(res.data);
    // console.log(res.data);
    // setFormData(mediaData);
    // console.log(formData);

    //api call with media data
  };

  //   const final = async () => {
  //     setFormData(mediaData);
  //     const res = await axios.post(
  //       "http://localhost:8080/posts/addpost",
  //       formData
  //     );
  //     console.log(res.data);
  //   };
  return (
    <div>
      <div className="formconatiner">
        <div>
          {" "}
          <label for="media">Media: </label>
          <input type="file" id="media" onChange={handleChangeMedia}></input>
        </div>
        <div>
          {" "}
          <label for="caption">Caption:</label>
          <input type="text" id="caption" onChange={(e) => handleChange(e)} />
        </div>
        <button onClick={submit}>Submit</button>
        {/* <button onClick={final}>FinalSubmit</button> */}
      </div>
    </div>
  );
}
