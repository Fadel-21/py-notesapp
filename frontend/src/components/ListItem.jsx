let getTimestamp = (note) => {
  return new Date(note.__updatedtime__).toLocaleDateString();
};
let trimmedContent = (note) => {
  //Slice content and add three dots in over 45 characters to show there is more
  let content = note.body;
  if (content.length > 45) {
    return content.slice(0, 35) + "...";
  } else {
    return content;
  }
};

export default function ListItem({ note }) {
  return (
    <div className="notes-list-item">
      <h1>{trimmedContent(note)}</h1>
      <p>
        <span>{getTimestamp(note)}</span>
      </p>
    </div>
  );
}
