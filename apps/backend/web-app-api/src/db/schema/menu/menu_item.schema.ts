import { pgTable, uuid, text, integer, jsonb } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { tenant } from '../tenant/tenant.schema';

export const menuItem = pgTable('menu_item', {
  id: uuid('id').defaultRandom().primaryKey(),
  parentId: uuid('parent_id'),
  label: text('label').notNull(),
  icon: text('icon'),
  path: text('path'),
  order: integer('order').default(0),
  featureFlag: text('feature_flag'),
  requiredActions: jsonb('required_actions').$type<string[]>().default([]).notNull(),
  tenantId: uuid('tenant_id')
    .references(() => tenant.id, { onDelete: 'cascade' })
    .notNull(),
});

export const menuRelations = relations(menuItem, ({ one, many }) => ({
  tenant: one(tenant, { fields: [menuItem.tenantId], references: [tenant.id] }),
  parent: one(menuItem, { fields: [menuItem.parentId], references: [menuItem.id] }),
  children: many(menuItem),
}));
