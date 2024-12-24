import {
  ControlBar,
  GridLayout,
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
} from "@livekit/components-react";

import "@livekit/components-styles";
import axios from "axios";

import { Track } from "livekit-client";
import { useEffect, useState } from "react";
import { backendUrl } from "../config";

const wsUrl = "wss://avashnp-p123vr0b.livekit.cloud";
// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzUwNDgzMTUsImlzcyI6IkFQSWFSdzk4TnlvZWE5MiIsIm5iZiI6MTczNTA0NzQxNSwic3ViIjoiU3Vrc2hhbSIsInZpZGVvIjp7ImNhblB1Ymxpc2giOnRydWUsImNhblB1Ymxpc2hEYXRhIjp0cnVlLCJjYW5TdWJzY3JpYmUiOnRydWUsInJvb20iOiJhdmFzaFJvb20iLCJyb29tSm9pbiI6dHJ1ZX19.EFw3WpthDB47-0BD8Rq6bQn9flepQ4GpjU_xZzZQVzM";
interface VideoProps {
  classId: string;
  username: string;
}
export default function Video({ classId, username }: VideoProps) {
  const [token, setToken] = useState("");
  useEffect(() => {
    const fetchToken = async () => {
      const response = await axios.get(`${backendUrl}/video/getToken`, {
        params: { classId, username },
      });
      setToken(response.data.msg);
    };
    fetchToken();
  });
  if (!token) {
    return <div>Loading...</div>;
  }
  <LiveKitRoom
    video={true}
    audio={true}
    token={token}
    serverUrl={wsUrl}
    data-lk-theme="default"
    style={{
      height: "400px",
      width: "600px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      overflow: "hidden",
      margin: "auto",
    }}
  >
    <MyVideoConference />
    <RoomAudioRenderer />
    <ControlBar />
  </LiveKitRoom>;
}

function MyVideoConference() {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  );

  return (
    <GridLayout
      tracks={tracks}
      style={{
        height: "calc(100% - var(--lk-control-bar-height))",
      }}
    >
      <ParticipantTile />
    </GridLayout>
  );
}
