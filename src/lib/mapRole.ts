export function mapRole(apiRole: string): string {
    const roleMap: Record<string, string> = {
        superAdmin: 'SUPER_ADMIN',
        admin: 'OPS_ADMIN',
        financeAdmin: 'FINANCE_ADMIN',
        supportAdmin: 'SUPPORT_ADMIN',
        viewer: 'VIEWER',
    };
    return roleMap[apiRole] ?? apiRole.toUpperCase();
}
