import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class InitialMigration1714032000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Users table
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'username',
            type: 'varchar',
            length: '30',
            isUnique: true,
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'avatar',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'signature',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'bio',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'wrz_balance',
            type: 'decimal',
            precision: 10,
            scale: 2,
            default: 50,
          },
          {
            name: 'post_count',
            type: 'int',
            default: 0,
          },
          {
            name: 'group',
            type: 'enum',
            enum: ['user', 'helper', 'moderator', 'section_head', 'admin', 'vip', 'platinum_vip'],
            default: "'user'",
          },
          {
            name: 'is_online',
            type: 'boolean',
            default: false,
          },
          {
            name: 'is_banned',
            type: 'boolean',
            default: false,
          },
          {
            name: 'ban_expires',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'is_verified',
            type: 'boolean',
            default: false,
          },
          {
            name: 'vip_expires',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'last_login_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    // Forums table
    await queryRunner.createTable(
      new Table({
        name: 'forums',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'parent_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'order',
            type: 'int',
            default: 0,
          },
          {
            name: 'topic_count',
            type: 'int',
            default: 0,
          },
          {
            name: 'post_count',
            type: 'int',
            default: 0,
          },
          {
            name: 'last_post_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'is_vip_only',
            type: 'boolean',
            default: false,
          },
          {
            name: 'section_head_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    // Topics table
    await queryRunner.createTable(
      new Table({
        name: 'topics',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'forum_id',
            type: 'int',
          },
          {
            name: 'user_id',
            type: 'int',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'type',
            type: 'enum',
            enum: ['normal', 'sticky', 'announcement'],
            default: "'normal'",
          },
          {
            name: 'view_count',
            type: 'int',
            default: 0,
          },
          {
            name: 'reply_count',
            type: 'int',
            default: 0,
          },
          {
            name: 'last_post_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'is_locked',
            type: 'boolean',
            default: false,
          },
          {
            name: 'is_moved',
            type: 'boolean',
            default: false,
          },
          {
            name: 'moved_to_topic_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'has_poll',
            type: 'boolean',
            default: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    // Posts table
    await queryRunner.createTable(
      new Table({
        name: 'posts',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'topic_id',
            type: 'int',
          },
          {
            name: 'user_id',
            type: 'int',
          },
          {
            name: 'content',
            type: 'text',
          },
          {
            name: 'thanks_count',
            type: 'int',
            default: 0,
          },
          {
            name: 'is_reported',
            type: 'boolean',
            default: false,
          },
          {
            name: 'is_approved',
            type: 'boolean',
            default: true,
          },
          {
            name: 'edited_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'edit_count',
            type: 'int',
            default: 0,
          },
          {
            name: 'ip_address',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    // Foreign keys
    await queryRunner.createForeignKey(
      'topics',
      new TableForeignKey({
        name: 'FK_topics_forum',
        columnNames: ['forum_id'],
        referencedTableName: 'forums',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'topics',
      new TableForeignKey({
        name: 'FK_topics_user',
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'posts',
      new TableForeignKey({
        name: 'FK_posts_topic',
        columnNames: ['topic_id'],
        referencedTableName: 'topics',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'posts',
      new TableForeignKey({
        name: 'FK_posts_user',
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'forums',
      new TableForeignKey({
        name: 'FK_forums_parent',
        columnNames: ['parent_id'],
        referencedTableName: 'forums',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('posts');
    await queryRunner.dropTable('topics');
    await queryRunner.dropTable('forums');
    await queryRunner.dropTable('users');
  }
}
