import { useState } from 'react';
import { Search } from 'lucide-react';

export interface Column {
    key: string;
    header: string;
    align?: 'left' | 'right' | 'center';
    render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
    columns: Column[];
    data: any[];
    searchKeys?: string[];
    searchPlaceholder?: string;
}

export default function DataTable({ columns, data, searchKeys, searchPlaceholder }: DataTableProps) {
    const [search, setSearch] = useState('');

    const filtered = search && searchKeys
        ? data.filter(row =>
            searchKeys.some(k =>
                String(row[k] || '').toLowerCase().includes(search.toLowerCase())
            )
        )
        : data;

    return (
        <div className="bg-surface-card rounded-2xl border border-border-subtle overflow-hidden">
            {/* Search */}
            {searchKeys && (
                <div className="p-4 border-b border-border-subtle">
                    <div className="relative w-full sm:w-96">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                        <input
                            type="text"
                            placeholder={searchPlaceholder || 'Search...'}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-surface border border-border-subtle rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-cyan/40 focus:ring-1 focus:ring-accent-cyan/20 transition-all"
                        />
                    </div>
                </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="dark-table w-full text-left border-collapse">
                    <thead>
                        <tr>
                            {columns.map((col) => (
                                <th key={col.key} className={`p-4 ${col.align === 'right' ? 'text-right' : ''} first:pl-6 last:pr-6`}>
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length > 0 ? (
                            filtered.map((row, i) => (
                                <tr key={row.id || i} className="animate-fade-in-up" style={{ animationDelay: `${0.03 * i}s` }}>
                                    {columns.map((col) => (
                                        <td key={col.key} className={`p-4 ${col.align === 'right' ? 'text-right' : ''} first:pl-6 last:pr-6`}>
                                            {col.render ? col.render(row[col.key], row) : (
                                                <span className="text-sm text-text-secondary">{row[col.key]}</span>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="p-12 text-center text-text-muted text-sm">
                                    No data found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            {filtered.length > 0 && (
                <div className="p-4 border-t border-border-subtle flex justify-between items-center text-sm text-text-muted">
                    <span>Showing {filtered.length} records</span>
                </div>
            )}
        </div>
    );
}
