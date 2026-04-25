import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Topic } from '../../topics/entities/topic.entity';
import { User } from '../../users/entities/user.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  topicId: number;

  @ManyToOne(() => Topic, (topic) => topic.posts)
  @JoinColumn({ name: 'topicId' })
  topic: Topic;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'text' })
  content: string;

  @Column({ default: 0 })
  thanksCount: number;

  @Column({ default: false })
  isReported: boolean;

  @Column({ default: true })
  isApproved: boolean;

  @Column({ nullable: true })
  editedAt: Date;

  @Column({ default: 0 })
  editCount: number;

  @Column({ nullable: true })
  ipAddress: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
