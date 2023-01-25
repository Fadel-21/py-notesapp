import ListItem from "@/components/ListItem";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import AddIcon from "../assets/add.svg";

export default function Home() {
  const [notes, setNotes] = useState([]);

  const getNotes = async () => {
    let response = await fetch(`http://127.0.0.1:8000/notes`);
    let data = await response.json();
    setNotes(data);
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className="notes">
      <Layout>
        <div className="notes-header">
          <h2 className="notes-title">&#9782; Notes</h2>
          <p className="notes-count">{notes.length}</p>
        </div>
        <div className="notes-list">
          {notes.map((key) => (
            <Link
              href={{
                pathname: `/${key.id}`,
                query: { name: `${key.body}` },
              }}
              as={`/${key.id}`}
            >
              <ListItem note={key} />
            </Link>
          ))}
        </div>
        <div className="floating-button">
          <Link href={`/add`}>
            <Image src={AddIcon} />
          </Link>
        </div>
      </Layout>
    </div>
  );
}
