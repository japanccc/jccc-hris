import { pgTable, text, timestamp, boolean } from 'drizzle-orm/pg-core';

// Users table - synced from Clerk
export const user = pgTable('user', {
	id: text('id').primaryKey(), // Clerk user ID
	email: text('email').notNull().unique(),
	name: text('name').notNull(),
	avatarUrl: text('avatar_url'),
	googleId: text('google_id').unique(),
	role: text('role').notNull().default('employee'), // 'admin' | 'national_leader' | 'manager' | 'employee'
	isActive: boolean('is_active').notNull().default(true),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
});

// Employees table - L5 HR data
export const employee = pgTable('employee', {
	id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
	userId: text('user_id')
		.notNull()
		.unique()
		.references(() => user.id, { onDelete: 'cascade' }),
	fullNameKanji: text('full_name_kanji'),
	fullNameKatakana: text('full_name_katakana'),
	preferredName: text('preferred_name'),
	birthDate: timestamp('birth_date'),
	nationality: text('nationality'),
	phone: text('phone'),
	emergencyContact: text('emergency_contact'),
	emergencyPhone: text('emergency_phone'),
	joinDate: timestamp('join_date'),
	position: text('position'),
	department: text('department'),
	managerId: text('manager_id').references(() => user.id),
	employmentType: text('employment_type'), // 'full-time' | 'part-time' | 'associate'
	workLocation: text('work_location'),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
});

// Audit log for compliance
export const auditLog = pgTable('audit_log', {
	id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
	userId: text('user_id').references(() => user.id),
	action: text('action').notNull(), // 'create', 'update', 'delete', 'view'
	resource: text('resource').notNull(), // 'employee', 'user'
	resourceId: text('resource_id'),
	changes: text('changes'), // JSON string of changes
	ipAddress: text('ip_address'),
	userAgent: text('user_agent'),
	timestamp: timestamp('timestamp').notNull().defaultNow()
});

// TypeScript types
export type User = typeof user.$inferSelect;
export type Employee = typeof employee.$inferSelect;
export type AuditLog = typeof auditLog.$inferSelect;
