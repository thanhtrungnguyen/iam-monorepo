import { pgTable, uuid, text, primaryKey } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { employee } from './employee.schema';
import { project } from '../project/project.schema';
import { timestamp } from 'drizzle-orm/pg-core';

export const employeeProject = pgTable(
  'employee_project',
  {
    employeeId: uuid()
      .references(() => employee.id, { onDelete: 'cascade' })
      .notNull(),
    projectId: uuid()
      .references(() => project.id, { onDelete: 'cascade' })
      .notNull(),
    roleOnProject: text(),
    joinedAt: timestamp({ withTimezone: true }).defaultNow(),
    leftAt: timestamp({ withTimezone: true }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.employeeId, t.projectId], name: 'employee_project_pk' }),
  }),
);

export const employeeProjectRelations = relations(employeeProject, ({ one }) => ({
  employee: one(employee, { fields: [employeeProject.employeeId], references: [employee.id] }),
  project: one(project, { fields: [employeeProject.projectId], references: [project.id] }),
}));
