import React from "react";
import Link from "next/link";

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/AboutMe">Über mich</Link>
        </li>
        <li>
          <Link href="/MyWork">Meine Dienstleistungen</Link>
        </li>
        <li>
          <Link href="/Contact">Kontakt</Link>
        </li>
        <li>
          <Link href="/">Startseite</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;