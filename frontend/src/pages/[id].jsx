import Layout from "@/components/Layout";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ArrowLeft from "../assets/arrow-left.svg";
import SaveIcon from "../assets/save.svg";

export default function Note() {
  const router = useRouter();
  const { id, name } = router.query;

  const [note, setNote] = useState(name);

  const submitNotes = async (e) => {
    e.preventDefault();
    let response = `http://127.0.0.1:8000/notes`;
    let method = "POST";

    if (id !== "add") {
      response = `http://127.0.0.1:8000/notes/${id}`;
      method = "PUT";
    }

    await fetch(response, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ body: note }),
    });
    router.back();
  };

  let deleteNote = async (e) => {
    e.preventDefault();
    await fetch(`http://127.0.0.1:8000/notes/${id}`, { method: "DELETE" });
    router.back();
  };

  return (
    <div className="note">
      <Layout>
        <div className="note-header">
          <h3>
            <Link href={`/`}>
              <Image src={ArrowLeft} height={25} />
            </Link>
          </h3>
          {id !== "add" && <button onClick={deleteNote}>Delete</button>}
        </div>
        <textarea
          onChange={(e) => setNote(e.target.value)}
          defaultValue={name}
          placeholder="Enter some notes..."
        ></textarea>
        <div className="floating-button">
          <Image src={SaveIcon} onClick={submitNotes}/>
        </div>
      </Layout>
    </div>
  );
}
