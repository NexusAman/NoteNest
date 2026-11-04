#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/0dd008e14b00f356d8a89d15dcd454724354157545ab864b517c94e2a72d40f4/contract';
import endContract from '../../snapshots/0dd008e14b00f356d8a89d15dcd454724354157545ab864b517c94e2a72d40f4/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/4466c41916f96cb0bb32da8b7bd4eb5563f26d9f63156c0955f45863e108da22/contract';
import startContract from '../../snapshots/4466c41916f96cb0bb32da8b7bd4eb5563f26d9f63156c0955f45863e108da22/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, lit, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropDefault({ schema: 'public', table: 'Note', column: 'content' }),
      this.createTable({
        schema: 'public',
        table: 'Category',
        columns: [
          col('color', 'text', {
            notNull: true,
            default: lit('#6366F1'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('isDefault', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('userId', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addColumn({
        schema: 'public',
        table: 'Note',
        column: col('isFavorite', 'bool', {
          notNull: true,
          default: lit(false),
          codecRef: { codecId: 'pg/bool@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'Note',
        column: col('isPinned', 'bool', {
          notNull: true,
          default: lit(false),
          codecRef: { codecId: 'pg/bool@1' },
        }),
      }),
      this.dropNotNull({ schema: 'public', table: 'Note', column: 'content' }),
      this.addRequiredColumnToEmptyTable({
        schema: 'public',
        table: 'Note',
        column: 'categoryId',
        type: 'uuid',
      }),
      this.addUnique({
        schema: 'public',
        table: 'Category',
        constraint: 'Category_userId_name_key',
        columns: ['userId', 'name'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Category',
        index: 'Category_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Note',
        index: 'Note_categoryId_idx_15c304f2',
        columns: ['categoryId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Category',
        foreignKey: {
          name: 'Category_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'User', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Note',
        foreignKey: {
          name: 'Note_categoryId_fkey',
          columns: ['categoryId'],
          references: { schema: 'public', table: 'Category', columns: ['id'] },
          onDelete: 'restrict',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
