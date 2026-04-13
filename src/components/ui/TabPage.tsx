import { useState } from 'react';

export interface Tab {
    id: string;
    label: string;
    content: React.ReactNode;
}

interface TabPageProps {
    title: string;
    description: string;
    tabs: Tab[];
    actions?: React.ReactNode;
}

export default function TabPage({ title, description, tabs, actions }: TabPageProps) {
    const [activeTab, setActiveTab] = useState(tabs[0]?.id || '');
    const activeContent = tabs.find(t => t.id === activeTab)?.content;

    return (
        <div className="space-y-5 animate-fade-in-up">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-white">{title}</h1>
                    <p className="text-xs sm:text-sm text-text-muted mt-1">{description}</p>
                </div>
                {actions && <div className="flex gap-2">{actions}</div>}
            </div>

            {/* Tab Bar */}
            <div className="border-b border-border-subtle overflow-x-auto">
                <div className="flex gap-0 min-w-max">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all relative ${activeTab === tab.id
                                    ? 'text-accent-cyan'
                                    : 'text-text-muted hover:text-text-primary'
                                }`}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-cyan rounded-full" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Active Panel */}
            <div className="animate-fade-in-up" key={activeTab}>
                {activeContent}
            </div>
        </div>
    );
}
