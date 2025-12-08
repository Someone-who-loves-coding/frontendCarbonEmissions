// components/chat/ChatSuggestions.tsx

type ChatSuggestionsProps = {
    onSelect: (text: string) => void;
};

const SUGGESTIONS = [
    "Which sector emits the most right now?",
    "How have emissions changed since 1990?",
    "Show trends for the transport sector",
    "What are recent policies impacting emissions?",
];

export function ChatSuggestions({ onSelect }: ChatSuggestionsProps) {
    return (
        <div className="flex flex-wrap gap-2 mt-2">
            {SUGGESTIONS.map((s) => (
                <button
                    key={s}
                    onClick={() => onSelect(s)}
                    className="text-[10px] px-2 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700"
                >
                    {s}
                </button>
            ))}
        </div>
    );
}
