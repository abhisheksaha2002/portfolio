import { useEffect, useRef, useState } from 'react'
import { answerQuestion, suggestedQuestions } from '../data/botKnowledge'
import { profile } from '../data/content'

type Message = { role: 'user' | 'assistant'; content: string }

export default function Chatbot({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hey! 👋 I'm ${profile.name.split(' ')[0]}'s AI assistant. Ask me anything about his skills, projects, or experience!`,
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const logRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, open, loading])

  async function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed || loading) return

    const nextMessages = [...messages, { role: 'user' as const, content: trimmed }]
    setMessages(nextMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      })

      if (!res.ok) throw new Error('API error')

      const data = await res.json()
      const reply = data.reply?.trim()

      if (!reply) throw new Error('Empty reply')

      setMessages((m) => [...m, { role: 'assistant', content: reply }])
    } catch {
      // Falls back to the local keyword-matched bot so the widget still
      // works before GROQ_API_KEY is configured, or if the API call fails.
      const fallback = answerQuestion(trimmed)
      setMessages((m) => [...m, { role: 'assistant', content: fallback }])
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed top-[68px] right-5 z-30 w-[92vw] max-w-[360px] max-h-[75vh] flex flex-col rounded-2xl border border-line bg-raised shadow-2xl overflow-hidden">
      {/* header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-line">
        <div className="w-10 h-10 rounded-full bg-signal/20 flex items-center justify-center text-xl shrink-0">
          🤖
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm m-0">Ask about {profile.name.split(' ')[0]}</p>
          <p className="text-xs m-0 flex items-center gap-1.5 text-dim">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
            AI online
          </p>
        </div>
        <button
          onClick={onClose}
          aria-label="Close chat"
          className="text-faint hover:text-ink text-lg leading-none px-1"
        >
          ✕
        </button>
      </div>

      {/* messages */}
      <div ref={logRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-[180px]">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`text-sm leading-relaxed rounded-xl px-3.5 py-2.5 max-w-[85%] whitespace-pre-wrap ${
              m.role === 'assistant' ? 'bg-bg border border-line text-ink' : 'bg-signal text-bg ml-auto'
            }`}
            style={m.role === 'user' ? { color: '#ffffff' } : undefined}
          >
            {m.content}
          </div>
        ))}

        {loading && (
          <div className="text-sm rounded-xl px-3.5 py-2.5 max-w-[85%] bg-bg border border-line text-faint">
            typing…
          </div>
        )}

        {messages.length === 1 && !loading && (
          <div className="space-y-2 pt-1">
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="w-full text-left text-sm text-dim border border-line rounded-xl px-3.5 py-2.5 hover:border-faint hover:text-ink transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* input */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          send(input)
        }}
        className="flex items-center gap-2 p-3 border-t border-line"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything…"
          disabled={loading}
          className="flex-1 bg-bg border border-line rounded-full px-4 py-2.5 text-sm text-ink placeholder:text-faint outline-none focus:border-signal disabled:opacity-60"
        />
        <button
          type="submit"
          aria-label="Send"
          disabled={loading}
          className="w-9 h-9 rounded-full bg-signal flex items-center justify-center shrink-0 disabled:opacity-60"
          style={{ color: '#ffffff' }}
        >
          ↑
        </button>
      </form>
    </div>
  )
}
