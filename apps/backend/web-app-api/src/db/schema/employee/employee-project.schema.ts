import { pgTable, uuid, text, primaryKey } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { employee } from './employee.schema';
import { project } from '../project/project.schema';
import { timestamp } from 'drizzle-orm/pg-core';

export const employeeProject = pgTable(
  'employee_project',
  {
    employeeId: uuid('employee_id')
      .references(() => employee.id, { onDelete: 'cascade' })
      .notNull(),
    projectId: uuid('project_id')
      .references(() => project.id, { onDelete: 'cascade' })
      .notNull(),
    roleOnProject: text('role_on_project'),
    joinedAt: timestamp('joined_at', { withTimezone: true }).defaultNow(),
    leftAt: timestamp('left_at', { withTimezone: true }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.employeeId, t.projectId], name: 'employee_project_pk' }),
  }),
);

export const employeeProjectRelations = relations(employeeProject, ({ one }) => ({
  employee: one(employee, { fields: [employeeProject.employeeId], references: [employee.id] }),
  project: one(project, { fields: [employeeProject.projectId], references: [project.id] }),
}));
