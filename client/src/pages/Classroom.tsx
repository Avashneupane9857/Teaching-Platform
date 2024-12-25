import { useState } from "react";
import Chat from "../components/ChatBox";
import SlideViewer from "../components/SlideViewer";
import Video from "../components/Video";

function Classroom() {
  const [isVideoPrimary, setIsVideoPrimary] = useState(true);

  const toggleLayout = () => {
    setIsVideoPrimary(!isVideoPrimary);
  };

  return (
    <>
      <div
        className="layout-toggle"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50px",
          backgroundColor: "#f4f4f4",
          borderTop: "1px solid #ddd",
        }}
      >
        <button
          onClick={toggleLayout}
          style={{
            padding: "8px 16px",
            fontSize: "16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Toggle Layout
        </button>
      </div>
      <div className="classroom-container" style={{ height: "100vh" }}>
        <div
          className="grid-container"
          style={{
            display: "grid",
            gridTemplateColumns: isVideoPrimary ? "1fr 1fr" : "2fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gap: "8px",
            height: "calc(100% - 50px)",
          }}
        >
          {isVideoPrimary ? (
            <>
              <div
                className="video-container"
                style={{ gridRow: "1 / 2", gridColumn: "1 / 2" }}
              >
                <Video />
              </div>
              <div
                className="slideviewer-container"
                style={{
                  gridRow: "1 / 3",
                  gridColumn: "2 / 3",
                  overflowY: "auto",
                  maxHeight: "100%",
                }}
              >
                <SlideViewer  />
              </div>
              <div
                className="chat-container"
                style={{
                  gridRow: "2 / 3",
                  gridColumn: "1 / 2",
                  overflowY: "auto",
                  maxHeight: "100%",
                }}
              >
                <Chat />
              </div>
            </>
          ) : (
            <>
              <div
                className="slideviewer-container"
                style={{
                  gridRow: "1 / 2",
                  gridColumn: "1 / 2",
                  overflowY: "auto",
                  maxHeight: "100%",
                }}
              >
                <SlideViewer />
              </div>
              <div
                className="video-container"
                style={{ gridRow: "1 / 2", gridColumn: "2 / 3" }}
              >
                <Video />
              </div>
              <div
                className="chat-container"
                style={{
                  gridRow: "2 / 3",
                  gridColumn: "2 / 3",
                  overflowY: "auto",
                  maxHeight: "100%",
                }}
              >
                <Chat />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Classroom;
