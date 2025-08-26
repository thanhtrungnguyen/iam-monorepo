import { pgTable, uuid, text, jsonb, uniqueIndex } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { tenant } from '../tenant/tenant.schema';
import { rolePolicy } from './role-policy.schema';
import { userPolicy } from './user-policy.schema';
import { timestamps } from '../../columns.helpers';
import { table } from 'console';

export type Statement = {
  Effect: 'Allow' | 'Deny';
  Action: string | string[];
  Resource: string | string[];
  Condition?: Record<string, unknown>;
};

export const policy = pgTable(
  'policy',
  {
    id: uuid().defaultRandom().primaryKey(),
    name: text().notNull(),
    statements: jsonb().$type<Statement[]>().notNull(),
    tenantId: uuid()
      .references(() => tenant.id, { onDelete: 'cascade' })
      .notNull(),
    ...timestamps,
  },
  (table) => [uniqueIndex('policy_name_tenant_uq').on(table.name, table.tenantId)],
);
// export const policyIdx = {
//   // nameTenantUq: uniqueIndex('policy_name_tenant_uq').on(policy.name, policy.tenantId),
// };
export const policyRelations = relations(policy, ({ one, many }) => ({
  tenant: one(tenant, { fields: [policy.tenantId], references: [tenant.id] }),
  rolePolicy: many(rolePolicy),
  userPolicy: many(userPolicy),
}));
