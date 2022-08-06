import React from "react";

const VCard = () => {
  const generateVCard = () => {
    var vCardsJS = require("vcards-js");
    var vCardSample = vCardsJS();
    vCardSample.firstName = "Andrew";
    vCardSample.lastName = "Ladd";
    vCardSample.workPhone = "(769)-257-1261";
    vCardSample.email = "andrew.laddstudio@gmail.com";
    vCardSample.title = "Business";
    vCardSample.url = "https://www.google.com";
    vCardSample.note = "Notes for Andrew";

    const FileSaver = require("file-saver");
    const blob = new Blob([vCardSample.getFormattedString()], {
      type: "text/vcard;charset=utf-8"
    });
    FileSaver.saveAs(blob, "andrew.vcf");
    return vCardSample;
    //get as formatted string
    //console.log(vCardSample.getFormattedString());
  };

  return (
    // <div className="App">
    <div className="card-item animated fadeInUp ">
      <div className="wrapper1">
        <a className="btn-card btn-download" onClick={generateVCard} href="#">
          download
        </a>
      </div>
      <section>
        <div>
          <p>GP</p>
        </div>
      </section>
      {/* <h2 className="title"> Andrew Ladd </h2>
      <h4 className="sub-title">Front-end Developer</h4> */}
      <hr className="hr-1" />
      {/* <p className="text-body">
        UI/UX Designer
      </p> */}
      <hr className="hr-1" />
      {/* <p className="text-body">
        andrew.laddstudio@gmail.com
        <br />
        769-257-1261
      </p> */}
      <div className="card-footer">
        <a className="btn-card text-black" href="mailto:andrew.laddstudio.com">
          mail
        </a>

        <a className="btn-card text-black" href="tel:+7692571261">
          phone
        </a>
      </div>
    </div>

  );
}

export default VCard
