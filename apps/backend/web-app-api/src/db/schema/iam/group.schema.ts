import { pgTable, uuid, text, uniqueIndex } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { tenant } from '../tenant/tenant.schema';
import { groupUser } from './group-user.schema';

export const group = pgTable(
  'group',
  {
    id: uuid().defaultRandom().primaryKey(),
    name: text().notNull(),
    tenantId: uuid()
      .references(() => tenant.id, { onDelete: 'cascade' })
      .notNull(),
  },
  (table) => [uniqueIndex('group_name_tenant_uq').on(table.name, table.tenantId)],
);
export const groupRelations = relations(group, ({ one, many }) => ({
  tenant: one(tenant, { fields: [group.tenantId], references: [tenant.id] }),
  members: many(groupUser),
}));
