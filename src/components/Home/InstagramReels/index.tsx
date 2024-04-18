import React from "react";
import "./style.css";

const InstagramReels = () => {
  return (
    <section>
      <div>
        <h5 className="text-center subHeading">Find Out</h5>
        <h4 className="heading-1 text-center">What's Trendings On Instagram</h4>
      </div>
      <div className="instagram_reels">
        <div className="sk-ww-instagram-reels" data-embed-id="25399682"></div>
        <script
          src="https://widgets.sociablekit.com/instagram-reels/widget.js"
          async
          defer
        ></script>
      </div>
    </section>
  );
};

export default InstagramReels;
