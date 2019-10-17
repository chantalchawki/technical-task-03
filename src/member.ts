import {Entity, BaseEntity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Member extends BaseEntity{
  @PrimaryGeneratedColumn()
  public id: string;

  @Column()
  public name: string;

  @Column()
  public email: string;

  @Column()
  public mobile: string;

  @Column()
  public committee: string;

  public constructor(memberObject) {
    super();
    const {id, name, email, mobile, committee} = memberObject;
    this.id = id;
    this.name = name;
    this.email = email;
    this.mobile = mobile;
    this.committee = committee;
  }
  
}