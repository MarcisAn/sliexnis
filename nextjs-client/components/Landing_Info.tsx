import React, { useState } from "react";
import Image from "next/image";
import A1 from "../assets/icons/temavatars/a1.png";
import A2 from "../assets/icons/temavatars/a2.png";
import A3 from "../assets/icons/temavatars/a3.png";

export default function Landing_Info() {
  const [selection, setSelection] = useState("idea");
  return (
    <div>
      <div className="info">
        <p>
          “Sliexnis” is your <span className="red">digital diary</span>, which
          helps you and your class to keep up with remote learning and in-person
          school work.
        </p>
        <p>
          Add <span className="red">tasks, tests and online lessons.</span>
          Change their priorities and get notifications for online lessons!
        </p>
        <p>
          “Sliexnis” is an <span className="red">open source</span> app. We are
          welcoming your contributions in the form of ideas or already developed
          features. All development is happening at{" "}
          <a href="https://github.com/marcis-andersons/sliexnis">
            <u>github</u>
          </a>
        </p>
        <p>
          Our backend servers run on 100%{" "}
          <span className="red">renewable energy.</span>
        </p>
        <p>You can plan your schoolwork yourself. There is no bureaucracy.</p>
      </div>

      <h2 className="tab-name">Features</h2>
      <ul className="features">
        <li>aa</li>
      </ul>

      <h2 className="tab-name">Team contacts</h2>
      <div className="team">
        <ContactInfoCard
          name="Mārcis Andersons"
          role="Lead developer"
          image={A1}
          email="marcis@sliexnis.lv"
        />
        <ContactInfoCard
          name="Miķelis Kočāns"
          role="UI/UX designer"
          image={A2}
          email="mikelis@sliexnis.lv"
        />
        <ContactInfoCard
          name="Marta Valnere"
          role="Accounting"
          email="marta@sliexnis.lv"
          image={A3}
        />
      </div>
    </div>
  );
  function ContactInfoCard(props: any) {
    const image = props.image;
    return (
      <div>
        <Image src={image} height="350px" width="350px"></Image>

        <h2>{props.name}</h2>
        <u>{props.email}</u>
        <h4>{props.role}</h4>
      </div>
    );
  }
}
