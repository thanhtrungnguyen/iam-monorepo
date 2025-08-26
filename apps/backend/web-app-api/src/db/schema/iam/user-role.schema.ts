import { pgTable, uuid, primaryKey } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { user } from './user.schema';
import { role } from './role.schema';

export const userRole = pgTable(
  'user_role',
  {
    userId: uuid()
      .references(() => user.id, { onDelete: 'cascade' })
      .notNull(),
    roleId: uuid()
      .references(() => role.id, { onDelete: 'cascade' })
      .notNull(),
  },
  (t) => ({ pk: primaryKey({ columns: [t.userId, t.roleId], name: 'user_role_pk' }) }),
);

export const userRoleRelations = relations(userRole, ({ one }) => ({
  user: one(user, { fields: [userRole.userId], references: [user.id] }),
  role: one(role, { fields: [userRole.roleId], references: [role.id] }),
}));
