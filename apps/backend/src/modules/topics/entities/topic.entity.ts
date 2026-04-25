import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Forum } from '../../forums/entities/forum.entity';
import { User } from '../../users/entities/user.entity';
import { Post } from '../../posts/entities/post.entity';

export enum TopicType {
  NORMAL = 'normal',
  STICKY = 'sticky',
  ANNOUNCEMENT = 'announcement',
}

@Entity('topics')
export class Topic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  forumId: number;

  @ManyToOne(() => Forum, (forum) => forum.topics)
  @JoinColumn({ name: 'forumId' })
  forum: Forum;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.topics)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  title: string;

  @Column({ type: 'enum', enum: TopicType, default: TopicType.NORMAL })
  type: TopicType;

  @Column({ default: 0 })
  viewCount: number;

  @Column({ default: 0 })
  replyCount: number;

  @Column({ nullable: true })
  lastPostId: number;

  @Column({ default: false })
  isLocked: boolean;

  @Column({ default: false })
  isMoved: boolean;

  @Column({ nullable: true })
  movedToTopicId: number;

  @Column({ default: false })
  hasPoll: boolean;

  @OneToMany(() => Post, (post) => post.topic)
  posts: Post[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
