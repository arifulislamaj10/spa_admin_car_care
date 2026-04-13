import { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, ArrowRight, Loader2, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

interface Message {
    id: string;
    role: 'user' | 'ai';
    content: string;
    action?: { label: string; to?: string; actionId?: string };
}

const INITIAL_MESSAGES: Message[] = [
    {
        id: '1',
        role: 'ai',
        content: "Hello! I'm your CarCare24x7 CARA. I can help you analyze platform data, navigate modules, or execute tasks. What do you need today?",
    }
];

const SUGGESTIONS = [
    "What's today's revenue?",
    "Show me pending support tickets",
    "How to ban a user?",
    "System health check"
];

/* ─── Mock AI Engine ─── */
const generateResponse = (query: string): Omit<Message, 'id'> => {
    const q = query.toLowerCase();

    if (q.includes('revenue') || q.includes('gmv')) {
        return {
            role: 'ai',
            content: "Based on real-time data, today's platform GMV is scaling perfectly at **$1.28M** (+32.4% MoM). Should I open the Fintech Core for a detailed breakdown?",
            action: { label: 'Open Fintech Core →', to: '/fintech/float' }
        };
    }

    if (q.includes('ticket') || q.includes('support')) {
        return {
            role: 'ai',
            content: "There are currently **14 pending tickets**, with 3 approaching SLAs. I recommend reviewing the Operations queue immediately.",
            action: { label: 'Go to Operations →', to: '/ops/support' }
        };
    }

    if (q.includes('ban') || q.includes('user') || q.includes('suspend')) {
        return {
            role: 'ai',
            content: "To suspend an account, locate the specific profile in the Identity module. As an Admin, you have authority to revoke platform access instantly.",
            action: { label: 'View User Directory →', to: '/users/directory' }
        };
    }

    if (q.includes('health') || q.includes('system') || q.includes('status')) {
        return {
            role: 'ai',
            content: "All core services are operational. The booking engine is serving requests at 45ms latency. Stripe webhooks are currently processing without errors.",
            action: { label: 'View System Alerts →', to: '/system-alerts' }
        };
    }

    return {
        role: 'ai',
        content: "I can look into that for you. Would you like me to run a deep scan across the database modules to find more specific insights?"
    };
};

export const AIAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const { user } = useAuthStore();

    // Scroll to bottom
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isTyping]);

    const handleSend = (text: string) => {
        if (!text.trim() || isTyping) return;

        const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simulate AI thinking latency
        setTimeout(() => {
            const aiResponse = generateResponse(text);
            setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), ...aiResponse }]);
            setIsTyping(false);
        }, 1200 + Math.random() * 800);
    };

    const handleAction = (action: Message['action']) => {
        if (!action) return;
        if (action.to) {
            navigate(action.to);
            setIsOpen(false); // Auto-close on navigation
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
            {/* Widget Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 ${isOpen
                    ? 'bg-surface-light border border-border-subtle text-text-muted scale-90 opacity-0 pointer-events-none'
                    : 'bg-gradient-to-r from-accent-cyan to-accent-purple text-white shadow-accent-cyan/20 opacity-100 scale-100 ring-4 ring-surface/50'
                    }`}
            >
                <Sparkles className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                </span>
            </button>

            {/* Chat Panel Window */}
            <div
                className={`absolute bottom-0 right-0 w-[380px] sm:w-[420px] max-w-[calc(100vw-32px)] bg-[#0A0D14]/95 backdrop-blur-xl border border-border-subtle rounded-2xl shadow-2xl shadow-black flex flex-col overflow-hidden transition-all duration-300 transform origin-bottom-right ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 pointer-events-none translate-y-4'
                    }`}
                style={{ height: 'min(600px, calc(100vh - 100px))' }}
            >
                {/* Header */}
                <div className="p-4 border-b border-border-subtle bg-gradient-to-r from-accent-cyan/10 to-transparent flex items-center justify-between flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-purple p-[1px]">
                            <div className="w-full h-full bg-surface-card rounded-xl flex items-center justify-center">
                                <Bot className="w-5 h-5 text-accent-cyan" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                CARA
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-accent-cyan/20 text-accent-cyan uppercase tracking-wider">Beta</span>
                            </h3>
                            <p className="text-[11px] text-text-muted flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse"></span>
                                Online & listening
                            </p>
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="p-2 text-text-muted hover:text-white hover:bg-surface-hover rounded-lg transition-colors">
                        <ChevronDown className="w-5 h-5" />
                    </button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-5 scroll-smooth relative custom-scrollbar">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] rounded-2xl p-3.5 text-[13px] leading-relaxed relative ${msg.role === 'user'
                                ? 'bg-accent-cyan text-[#0A0D14] rounded-tr-sm font-medium shadow-lg shadow-accent-cyan/10'
                                : 'bg-surface-card border border-border-subtle text-text-primary rounded-tl-sm'
                                }`}>
                                {/* AI Name Tag */}
                                {msg.role === 'ai' && (
                                    <div className="flex items-center gap-1.5 mb-1.5 text-[10px] font-bold text-accent-cyan uppercase tracking-wider">
                                        <Sparkles className="w-3 h-3" /> CARA
                                    </div>
                                )}

                                {/* Message text parsing simple markdown (bold) */}
                                <div dangerouslySetInnerHTML={{ __html: msg.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />

                                {/* Action Button */}
                                {msg.action && (
                                    <button
                                        onClick={() => handleAction(msg.action)}
                                        className="mt-3 w-full py-2 px-3 bg-[#0d1117] border border-border-subtle rounded-lg text-xs font-semibold text-accent-cyan hover:bg-surface-hover hover:border-accent-cyan/50 transition-all flex items-center justify-between group"
                                    >
                                        {msg.action.label}
                                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                        <div className="flex justify-start animate-fade-in">
                            <div className="bg-surface-card border border-border-subtle rounded-2xl rounded-tl-sm p-4 flex gap-1.5 items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} className="h-2" />
                </div>

                {/* Input Area */}
                <div className="p-3 bg-surface-card border-t border-border-subtle flex-shrink-0 z-10">
                    {/* Suggestions Scroll */}
                    {messages.length < 3 && !isTyping && (
                        <div className="flex gap-2 mb-3 overflow-x-auto pb-1 custom-scrollbar scrollbar-hide">
                            {SUGGESTIONS.map((s, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleSend(s)}
                                    className="px-3 py-1.5 whitespace-nowrap bg-surface-hover border border-border-subtle rounded-full text-[11px] font-medium text-text-secondary hover:text-accent-cyan hover:border-accent-cyan/30 transition-colors"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="relative flex items-center bg-[#0d1117] border border-border-subtle rounded-xl shadow-inner focus-within:border-accent-cyan/50 focus-within:ring-1 focus-within:ring-accent-cyan/50 transition-all">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend(input);
                                }
                            }}
                            placeholder={isTyping ? "CARA is thinking..." : `Ask CARA anything, ${user?.firstName}...`}
                            disabled={isTyping}
                            className="flex-1 bg-transparent border-none text-sm text-white placeholder:text-text-muted px-4 py-3.5 focus:outline-none disabled:opacity-50"
                        />
                        <button
                            onClick={() => handleSend(input)}
                            disabled={!input.trim() || isTyping}
                            className={`p-2 mr-2 rounded-lg transition-colors flex flex-shrink-0 items-center justify-center ${input.trim() && !isTyping
                                ? 'bg-accent-cyan text-[#0d1117] hover:bg-accent-cyan/90'
                                : 'text-text-muted bg-surface-hover'
                                }`}
                        >
                            {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4 ml-0.5" />}
                        </button>
                    </div>
                    <p className="text-center text-[9px] text-text-muted mt-2">AI can make mistakes. Verify important platform logs.</p>
                </div>
            </div>
        </div>
    );
};
