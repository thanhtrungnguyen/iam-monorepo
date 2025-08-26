import { pgTable, uuid, text } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { user } from '../iam/user.schema';
import { tenant } from '../tenant/tenant.schema';
import { timestamps } from '../../columns.helpers';
import { employeeProject } from '../employee/employee-project.schema';

export const project = pgTable('project', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  ownerId: uuid('owner_id').references(() => user.id, { onDelete: 'set null' }),
  department: text('department'),
  tenantId: uuid('tenant_id')
    .references(() => tenant.id, { onDelete: 'cascade' })
    .notNull(),
  ...timestamps,
});

export const projectRelations = relations(project, ({ one, many }) => ({
  tenant: one(tenant, { fields: [project.tenantId], references: [tenant.id] }),
  owner: one(user, { fields: [project.ownerId], references: [user.id] }),
  members: many(employeeProject),
}));
