import React from "react";
import useField from "./hooks/useField";
import useResource from "./hooks/useResource";
import useUpdate from "./hooks/useUpdate";

const App = () => {
  const content = useField("text");
  const name = useField("text");
  const number = useField("text");

  const [notes, noteService] = useResource("http://localhost:3005/notes");
  const [persons, personService] = useResource("http://localhost:3005/persons");

  const noteUpdate = useUpdate();
  const personUpdate = useUpdate();

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    if (noteUpdate.mode === "create") {
      noteService.create({ content: content.value });
    } else {
      noteService.update(noteUpdate.id, { content: content.value });
      noteUpdate.setMode("create");
    }

    content.reset();
  };

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    if (personUpdate.mode === "create") {
      personService.create({ name: name.value, number: number.value });
    } else {
      personService.update(personUpdate.id, {
        name: name.value,
        number: number.value,
      });
      personUpdate.setMode("create");
    }

    name.reset();
    number.reset();
  };

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input
          type={content.type}
          value={content.value}
          onChange={content.onChange}
        />
        <button>{noteUpdate.mode}</button>
      </form>
      {notes.map((n) => (
        <div key={n.id}>
          <p>
            {n.content}
            <span style={{ marginLeft: 5 }}>
              <button
                onClick={(e) =>
                  noteUpdate.handleUpdate(e, n.id, notes, [
                    { setFn: content.setValue, field: "content" },
                  ])
                }
              >
                edit
              </button>
            </span>
          </p>
        </div>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name{" "}
        <input type={name.type} value={name.value} onChange={name.onChange} />{" "}
        <br />
        number{" "}
        <input
          type={number.type}
          value={number.value}
          onChange={number.onChange}
        />
        <button>{personUpdate.mode}</button>
      </form>
      {persons.map((n) => (
        <div key={n.id}>
          <p>
            {n.name} {n.number}
            <span style={{ marginLeft: 5 }}>
              <button
                onClick={(e) =>
                  personUpdate.handleUpdate(e, n.id, persons, [
                    { setFn: name.setValue, field: "name" },
                    { setFn: number.setValue, field: "number" },
                  ])
                }
              >
                edit
              </button>
            </span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default App;
