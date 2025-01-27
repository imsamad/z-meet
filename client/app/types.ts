export type Events =
  | { method: "CREATE-ROOM"; data: { room: string; user: string } }
  | { method: "ROOM-CREATED"; data: { status: "SUCCESS" | "FAILURE" } }
  | { method: "REJOIN-ROOM-AS-OWNER"; data: { room: string; user: string } }
  | { method: "ASK-PERMISSION"; data: { SDP: any; room: string; user: string } }
  | {
      method: "SEEK-PERMISSON";
      data: { sdp: any; user: string };
    }
  | {
      method: "GRANT-PERMISSION";
      data: { answer: any; user: string; room: string };
    }
  | {
      method: "DENY-PERMISSION";
      data: { user: string; room: string };
    };
