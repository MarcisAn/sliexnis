import React, { useState } from "react";
import Image from "next/image";
import A1 from "../assets/icons/temavatars/a1.png";
import A2 from "../assets/icons/temavatars/a2.png";
import A3 from "../assets/icons/temavatars/a3.png";

import Bells from "../assets/landing/features/bels.png";
import Dots from "../assets/landing/features/dots.png";
import Exlmarks from "../assets/landing/features/exlmarks.png";
import FOSS from "../assets/landing/features/foss.png";
import Squeres from "../assets/landing/features/squeres.png";
import Submit from "../assets/landing/features/submit.png";

export default function Landing_Info() {
  const [selection, setSelection] = useState("idea");
  return (
    <div style={{ paddingTop: "10em" }}>
      <h2 className="tab-name">What is SLIEXNIS?</h2>

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
      </div>

      <h2 className="tab-name">Features</h2>
      <ul className="features">
        <li>
          Task and online lesson tracking
          <Image width="150px" height="32px" src={Dots} />
        </li>
        <li>
          Order tasks by priority
          <Image width="150px" height="32px" src={Exlmarks} />
        </li>
        <li>
          Reminder notifications
          <Image width="150px" height="62px" src={Bells} />
        </li>
        <li>
          Calendar
          <Image width="150px" height="32px" src={Squeres} />
        </li>
        <li>
          Task submission to teachers
          <Image width="150px" height="32px" src={Submit} />
        </li>
        <li>
          Contact us and share your ideas
          <Image width="150px" height="32px" src={FOSS} />
        </li>
      </ul>

      <h2 className="tab-name">Team contacts</h2>
      <div className="team">
        <ContactInfoCard
          name="Mārcis Andersons"
          role="Developer"
          image={A2}
          email="marcis@sliexnis.lv"
        />
        <ContactInfoCard
          name="Miķelis Kočāns"
          role="UI/UX designer"
          image={A1}
          email="mikelis@sliexnis.lv"
        />
        <ContactInfoCard
          name="Marta Valnere"
          role="Management"
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
