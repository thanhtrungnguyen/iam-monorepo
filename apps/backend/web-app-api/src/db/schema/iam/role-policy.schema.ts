import { pgTable, uuid, primaryKey } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { role } from './role.schema';
import { policy } from './policy.schema';

export const rolePolicy = pgTable(
  'role_policy',
  {
    roleId: uuid()
      .references(() => role.id, { onDelete: 'cascade' })
      .notNull(),
    policyId: uuid()
      .references(() => policy.id, { onDelete: 'cascade' })
      .notNull(),
  },
  (t) => ({ pk: primaryKey({ columns: [t.roleId, t.policyId], name: 'role_policy_pk' }) }),
);

export const rolePolicyRelations = relations(rolePolicy, ({ one }) => ({
  role: one(role, { fields: [rolePolicy.roleId], references: [role.id] }),
  policy: one(policy, { fields: [rolePolicy.policyId], references: [policy.id] }),
}));
