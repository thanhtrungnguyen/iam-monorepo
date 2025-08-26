import { pgTable, uuid, primaryKey } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { group } from './group.schema';
import { user } from './user.schema';

export const groupUser = pgTable(
  'group_user',
  {
    groupId: uuid('group_id')
      .references(() => group.id, { onDelete: 'cascade' })
      .notNull(),
    userId: uuid('user_id')
      .references(() => user.id, { onDelete: 'cascade' })
      .notNull(),
  },
  (t) => ({ pk: primaryKey({ columns: [t.groupId, t.userId], name: 'group_user_pk' }) }),
);

export const groupUserRelations = relations(groupUser, ({ one }) => ({
  group: one(group, { fields: [groupUser.groupId], references: [group.id] }),
  user: one(user, { fields: [groupUser.userId], references: [user.id] }),
}));
