import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, Tree, TreeParent, TreeChildren } from 'typeorm';
import { Topic } from '../../topics/entities/topic.entity';

@Entity('forums')
export class Forum {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  parentId: number;

  @TreeParent()
  parent: Forum;

  @TreeChildren()
  children: Forum[];

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: 0 })
  order: number;

  @Column({ default: 0 })
  topicCount: number;

  @Column({ default: 0 })
  postCount: number;

  @Column({ nullable: true })
  lastPostId: number;

  @Column({ default: false })
  isVipOnly: boolean;

  @Column({ nullable: true })
  sectionHeadId: number;

  @OneToMany(() => Topic, (topic) => topic.forum)
  topics: Topic[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
