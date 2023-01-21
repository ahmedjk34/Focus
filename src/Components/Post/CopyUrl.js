import React from "react";

function CopyUrl({ id, close }) {
  return (
    <div className="popUp copyUrl">
      <h2>Copy URL</h2>
      <h4 className="url">{`https://ahmedjk34.github.io/focus/#/post/${id}`}</h4>
      <div>
        <button
          onClick={() => {
            navigator.clipboard.writeText(
              `https://ahmedjk34.github.io/focus/#/post/${id}`
            );
            close();
          }}
        >
          Copy
        </button>
        <button onClick={close}>Close</button>
      </div>
    </div>
  );
}

export default CopyUrl;
