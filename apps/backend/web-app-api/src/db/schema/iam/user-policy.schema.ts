import { pgTable, uuid, primaryKey } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { user } from './user.schema';
import { policy } from './policy.schema';

export const userPolicy = pgTable(
  'user_policy',
  {
    userId: uuid()
      .references(() => user.id, { onDelete: 'cascade' })
      .notNull(),
    policyId: uuid()
      .references(() => policy.id, { onDelete: 'cascade' })
      .notNull(),
  },
  (t) => ({ pk: primaryKey({ columns: [t.userId, t.policyId], name: 'user_policy_pk' }) }),
);

export const userPolicyRelations = relations(userPolicy, ({ one }) => ({
  user: one(user, { fields: [userPolicy.userId], references: [user.id] }),
  policy: one(policy, { fields: [userPolicy.policyId], references: [policy.id] }),
}));
