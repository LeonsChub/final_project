import React, { useState } from "react";

function CreateRoomForm() {
  const [name, setName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  return (
    <form className="text-light">
      <div className="form-outline mb-2">
        <label className="form-label" htmlFor="form2Example1">
          Room name
        </label>
        <input
          type="email"
          id="form2Example1"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="row mb-2">
        <div className="col d-flex justify-content-center">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value={isPrivate}
              onChange={() => setIsPrivate((prev) => !prev)}
              id="form2Example31"
              checked={isPrivate}
            />
            <label className="form-check-label" htmlFor="form2Example31">
              Private
            </label>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <button type="button" className="btn btn-primary btn-block mx-auto">
          Create Room
        </button>
      </div>
    </form>
  );
}

export default CreateRoomForm;
