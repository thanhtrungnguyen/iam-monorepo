import { pgTable, uuid, text, uniqueIndex } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { tenant } from '../tenant/tenant.schema';
import { user } from '../iam/user.schema';
import { timestamps } from '../../columns.helpers';
import { employeeProject } from './employee-project.schema';

export const employee = pgTable(
  'employee',
  {
    id: uuid().defaultRandom().primaryKey(),
    code: text().notNull(),
    fullName: text().notNull(),
    department: text(),
    createdBy: uuid().references(() => user.id, { onDelete: 'set null' }),
    updatedBy: uuid().references(() => user.id, { onDelete: 'set null' }),
    tenantId: uuid()
      .references(() => tenant.id, { onDelete: 'cascade' })
      .notNull(),
    ...timestamps,
  },
  (table) => [uniqueIndex('employee_code_tenant_uq').on(table.code, table.tenantId)],
);

// export const employeeIdx = {
//   // codeTenantUq: uniqueIndex('employee_code_tenant_uq').on(employee.code, employee.tenantId),
// };

export const employeeRelations = relations(employee, ({ one, many }) => ({
  tenant: one(tenant, { fields: [employee.tenantId], references: [tenant.id] }),
  creator: one(user, { fields: [employee.createdBy], references: [user.id] }),
  updater: one(user, { fields: [employee.updatedBy], references: [user.id] }),
  project: many(employeeProject),
}));
