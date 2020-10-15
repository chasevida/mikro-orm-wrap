import { Migration } from '@mikro-orm/migrations';

export class Migration20201015204538 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `user_profile` (`id` varchar(255) not null, `name` varchar(255) not null, `status` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `user_profile` add primary key `user_profile_pkey`(`id`);');

    this.addSql('create table `user_email` (`id` varchar(255) not null, `email` varchar(255) not null, `user_id` varchar(255) not null, `primary` tinyint(1) not null, `status` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `user_email` add primary key `user_email_pkey`(`id`);');
    this.addSql('alter table `user_email` add index `user_email_email_index`(`email`);');
    this.addSql('alter table `user_email` add index `user_email_user_id_index`(`user_id`);');

    this.addSql('alter table `user_email` add constraint `user_email_user_id_foreign` foreign key (`user_id`) references `user_profile` (`id`) on update cascade;');
  }

}
