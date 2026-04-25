import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Post } from '../../posts/entities/post.entity';
import { Topic } from '../../topics/entities/topic.entity';

export enum UserGroup {
  USER = 'user',
  HELPER = 'helper',
  MODERATOR = 'moderator',
  SECTION_HEAD = 'section_head',
  ADMIN = 'admin',
  VIP = 'vip',
  PLATINUM_VIP = 'platinum_vip',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 30 })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ type: 'text', nullable: true })
  signature: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 50 })
  wrzBalance: number;

  @Column({ default: 0 })
  postCount: number;

  @Column({ type: 'enum', enum: UserGroup, default: UserGroup.USER })
  group: UserGroup;

  @Column({ default: false })
  isOnline: boolean;

  @Column({ default: false })
  isBanned: boolean;

  @Column({ nullable: true })
  banExpires: Date;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ nullable: true })
  vipExpires: Date;

  @OneToMany(() => Topic, (topic) => user)
  topics: Topic[];

  @OneToMany(() => Post, (post) => user)
  posts: Post[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  lastLoginAt: Date;
}
