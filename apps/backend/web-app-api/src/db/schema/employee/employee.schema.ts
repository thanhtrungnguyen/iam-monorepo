import { pgTable, uuid, text, uniqueIndex } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { tenant } from '../tenant/tenant.schema';
import { user } from '../iam/user.schema';
import { timestamps } from '../../columns.helpers';
import { employeeProject } from './employee-project.schema';

export const employee = pgTable('employee', {
  id: uuid('id').defaultRandom().primaryKey(),
  code: text('code').notNull(),
  fullName: text('full_name').notNull(),
  department: text('department'),
  createdBy: uuid('created_by').references(() => user.id, { onDelete: 'set null' }),
  updatedBy: uuid('updated_by').references(() => user.id, { onDelete: 'set null' }),
  tenantId: uuid('tenant_id')
    .references(() => tenant.id, { onDelete: 'cascade' })
    .notNull(),
  ...timestamps,
});

export const employeeIdx = {
  codeTenantUq: uniqueIndex('employee_code_tenant_uq').on(employee.code, employee.tenantId),
};

export const employeeRelations = relations(employee, ({ one, many }) => ({
  tenant: one(tenant, { fields: [employee.tenantId], references: [tenant.id] }),
  creator: one(user, { fields: [employee.createdBy], references: [user.id] }),
  updater: one(user, { fields: [employee.updatedBy], references: [user.id] }),
  project: many(employeeProject),
}));
