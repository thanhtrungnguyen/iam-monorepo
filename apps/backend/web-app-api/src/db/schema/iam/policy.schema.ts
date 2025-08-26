import { pgTable, uuid, text, jsonb } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { tenant } from '../tenant/tenant.schema';
import { rolePolicy } from './role-policy.schema';
import { userPolicy } from './user-policy.schema';
import { timestamps } from '../../columns.helpers';

export type Statement = {
  Effect: 'Allow' | 'Deny';
  Action: string | string[];
  Resource: string | string[];
  Condition?: Record<string, unknown>;
};

export const policy = pgTable('policy', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  statements: jsonb('statements').$type<Statement[]>().notNull(),
  tenantId: uuid('tenant_id')
    .references(() => tenant.id, { onDelete: 'cascade' })
    .notNull(),
  ...timestamps,
});
export const policyIdx = {
  // nameTenantUq: uniqueIndex('policy_name_tenant_uq').on(policy.name, policy.tenantId),
};
export const policyRelations = relations(policy, ({ one, many }) => ({
  tenant: one(tenant, { fields: [policy.tenantId], references: [tenant.id] }),
  rolePolicy: many(rolePolicy),
  userPolicy: many(userPolicy),
}));
