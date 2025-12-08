// components/chat/ChatPanel.tsx
"use client";

import { useState } from "react";
import { ChatMessageBubble } from "./ChatMessageBubble";
import { ChatSuggestions } from "./ChatSuggestions";

type ChatMessage = {
    id: string;
    role: "user" | "assistant";
    content: string;
};

export function ChatPanel() {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: "welcome",
            role: "assistant",
            content:
                "Hi! I’m your emissions assistant. Ask me about sectors, trends, or climate policies, and I’ll use the dashboard data plus the internet to answer.",
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // async function handleSend(text?: string) {
    //     const content = (text ?? input).trim();
    //     if (!content) return;
    //
    //     const newUserMessage: ChatMessage = {
    //         id: crypto.randomUUID(),
    //         role: "user",
    //         content,
    //     };
    //
    //     setMessages((prev) => [...prev, newUserMessage]);
    //     setInput("");
    //     setIsLoading(true);
    //
    //     try {
    //         // TODO: replace with actual backend call (Spring Boot / Django etc.)
    //         // For now, mock a simple response:
    //         const mockResponse: ChatMessage = {
    //             id: crypto.randomUUID(),
    //             role: "assistant",
    //             content:
    //                 "This is a placeholder answer. Here, I would analyze the dashboard data, call your emissions API, and optionally query the internet to give a detailed explanation.",
    //         };
    //
    //         // Simulate latency
    //         await new Promise((r) => setTimeout(r, 600));
    //
    //         setMessages((prev) => [...prev, mockResponse]);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // }

    async function handleSend(text?: string) {
        const content = (text ?? input).trim();
        if (!content) return;

        const newUserMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: "user",
            content,
        };

        setMessages((prev) => [...prev, newUserMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const res = await fetch("https://backendcarbonemissions.onrender.com/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [...messages, newUserMessage].map(m => ({
                        role: m.role,
                        content: m.content,
                    })),
                }),
            });

            const data = await res.json();
            const reply = data.reply ?? "Something went wrong.";

            const aiMessage: ChatMessage = {
                id: crypto.randomUUID(),
                role: "assistant",
                content: reply,
            };

            setMessages((prev) => [...prev, aiMessage]);
        } catch (err) {
            setMessages(prev => [...prev, {
                id: crypto.randomUUID(),
                role: "assistant",
                content: "⚠️ Failed to fetch response from assistant.",
            }]);
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <section className="h-full rounded-2xl border border-slate-800 bg-slate-900/80 flex flex-col">
            <header className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                <div>
                    <h2 className="text-sm font-semibold">Ask Emission Assistant</h2>
                    <p className="text-[10px] text-slate-400">
                        Chat about dashboard data & global emission insights
                    </p>
                </div>
                <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/40">
          Online
        </span>
            </header>

            <div className="flex-1 overflow-y-auto px-3 py-3 text-xs">
                {messages.map((m) => (
                    <ChatMessageBubble key={m.id} role={m.role} content={m.content} />
                ))}
                {isLoading && (
                    <div className="text-[10px] text-slate-400 italic mt-1">
                        Thinking…
                    </div>
                )}
            </div>

            <div className="border-t border-slate-800 px-3 py-2">
                <ChatSuggestions onSelect={(t) => handleSend(t)} />
                <form
                    className="mt-2 flex items-center gap-2"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSend();
                    }}
                >
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about emissions, sectors, trends..."
                        className="flex-1 text-xs bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="text-xs px-3 py-2 rounded-xl bg-emerald-500 text-slate-950 font-medium hover:bg-emerald-400 disabled:opacity-50"
                    >
                        Send
                    </button>
                </form>
            </div>
        </section>
    );
}
