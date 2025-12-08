// components/chat/ChatMessageBubble.tsx

type ChatMessageBubbleProps = {
    role: "user" | "assistant";
    content: string;
};

export function ChatMessageBubble({ role, content }: ChatMessageBubbleProps) {
    const isUser = role === "user";
    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}>
            <div
                className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                    isUser
                        ? "bg-emerald-500 text-slate-950 rounded-br-sm"
                        : "bg-slate-800 text-slate-100 rounded-bl-sm"
                }`}
            >
                {content}
            </div>
        </div>
    );
}
