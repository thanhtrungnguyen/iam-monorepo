import { pgTable, uuid, text } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { tenant } from '../tenant/tenant.schema';
import { rolePolicy } from './role-policy.schema';
import { userRole } from './user-role.schema';

export const role = pgTable('role', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  tenantId: uuid('tenant_id')
    .references(() => tenant.id, { onDelete: 'cascade' })
    .notNull(),
});
export const roleIdx = {
  // nameTenantUq: uniqueIndex('role_name_tenant_uq').on(role.name, role.tenantId),
};
export const roleRelations = relations(role, ({ one, many }) => ({
  tenant: one(tenant, { fields: [role.tenantId], references: [tenant.id] }),
  userRole: many(userRole),
  rolePolicy: many(rolePolicy),
}));
