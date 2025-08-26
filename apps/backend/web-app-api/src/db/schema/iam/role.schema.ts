import { pgTable, uuid, text, uniqueIndex } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { tenant } from '../tenant/tenant.schema';
import { rolePolicy } from './role-policy.schema';
import { userRole } from './user-role.schema';

export const role = pgTable(
  'role',
  {
    id: uuid().defaultRandom().primaryKey(),
    name: text().notNull(),
    description: text(),
    tenantId: uuid()
      .references(() => tenant.id, { onDelete: 'cascade' })
      .notNull(),
  },
  (table) => [uniqueIndex('role_name_tenant_uq').on(table.name, table.tenantId)],
);
export const roleRelations = relations(role, ({ one, many }) => ({
  tenant: one(tenant, { fields: [role.tenantId], references: [tenant.id] }),
  userRole: many(userRole),
  rolePolicy: many(rolePolicy),
}));
