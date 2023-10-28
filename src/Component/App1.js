import React from "react";
import Header from "./Header";
import AboutUs from "./AboutUs";
import Image from "./Image";
import TicketInfor from "./TicketInfor";
import Footer from "./Footer";
import News from "./News";
import PhotoAlbum from "./Album";
import "./App1.css";
import SocialIcons from "./SocialIcons";

function App1() {
  return (
    <div>
      <Header />
      <PhotoAlbum />
      <AboutUs />
      <Image />
      <TicketInfor />
      <News />
      <Footer />
      <SocialIcons />
    </div>
  );
}

export default App1;
