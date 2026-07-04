import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";

export default function Chat() {
  const { interestId } = useParams();
  const { user } = useAuth();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (interestId) {
      loadMessages();

      const channel = supabase
        .channel("chat-room")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "messages",
            filter: `interest_id=eq.${interestId}`,
          },
          () => {
            loadMessages();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [interestId]);

  async function loadMessages() {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("interest_id", interestId)
      .order("created_at", { ascending: true });

    if (!error) {
      setMessages(data || []);
    }
  }

  async function sendMessage() {
    if (!text.trim()) return;

    const { error } = await supabase.from("messages").insert({
      interest_id: interestId,
      sender_id: user.id,
      message: text,
    });

    if (!error) {
      setText("");
      loadMessages();
    }
  }

  return (
    <div className="min-h-screen bg-[#faf7f2] py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow p-6">

        <h2 className="text-3xl font-bold mb-6">
          Chat
        </h2>

        <div className="h-[500px] overflow-y-auto border rounded-2xl p-4 space-y-3">

          {messages.length === 0 && (
            <p className="text-center text-gray-400">
              No messages yet
            </p>
          )}

          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${
                m.sender_id === user.id
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-4 py-3 rounded-2xl ${
                  m.sender_id === user.id
                    ? "bg-green-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                {m.message}
              </div>
            </div>
          ))}

        </div>

        <div className="flex gap-3 mt-6">

          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border rounded-xl px-4 py-3 outline-none"
          />

          <button
            onClick={sendMessage}
            className="bg-green-600 hover:bg-green-700 text-white px-6 rounded-xl"
          >
            Send
          </button>

        </div>

      </div>
    </div>
  );
}