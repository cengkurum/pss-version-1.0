SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";
CREATE DATABASE IF NOT EXISTS pss_v1 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE pss_v1;

CREATE TABLE IF NOT EXISTS activity_log (
  id bigint(20) NOT NULL,
  user_id bigint(20) NOT NULL,
  activity_code varchar(100) NOT NULL,
  result varchar(100) NOT NULL,
  uri varchar(300) NOT NULL,
  log_details text NOT NULL,
  ip_address varchar(100) NOT NULL,
  event_time datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `help` (
  id bigint(20) NOT NULL,
  help_code varchar(100) NOT NULL,
  title varchar(300) NOT NULL,
  details text NOT NULL,
  _entered_by bigint(20) DEFAULT NULL,
  is_active enum('Y','N') NOT NULL DEFAULT 'Y'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS message_exchange (
  id bigint(20) NOT NULL,
  _template_id bigint(20) DEFAULT NULL,
  details text NOT NULL,
  `subject` varchar(300) NOT NULL,
  attachment_url varchar(300) NOT NULL,
  _sender_id bigint(20) DEFAULT NULL,
  sender_type enum('user','store','chain') NOT NULL DEFAULT 'user',
  _recipient_id bigint(20) DEFAULT NULL,
  cashback float NOT NULL,
  is_perk enum('Y','N') NOT NULL DEFAULT 'N',
  _category_id bigint(20) NOT NULL,
  date_entered datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS message_status (
  id bigint(20) NOT NULL,
  _exchange_id bigint(20) DEFAULT NULL,
  _user_id bigint(20) DEFAULT NULL,
  `status` enum('received','read','replied','archived') NOT NULL DEFAULT 'received',
  date_entered datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS message_templates (
  id bigint(20) NOT NULL,
  message_type varchar(100) NOT NULL,
  `subject` varchar(300) NOT NULL,
  details text NOT NULL,
  sms varchar(160) NOT NULL,
  copy_admin enum('Y','N') NOT NULL DEFAULT 'N',
  date_entered datetime NOT NULL,
  _entered_by bigint(20) DEFAULT NULL,
  last_updated datetime NOT NULL,
  _last_updated_by bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS queries (
  id bigint(20) NOT NULL,
  `code` varchar(300) NOT NULL,
  details text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS users (
  id bigint(20) NOT NULL,
  first_name varchar(300) NOT NULL,
  middle_name varchar(200) NOT NULL,
  last_name varchar(300) NOT NULL,
  gender enum('male','female','unknown') NOT NULL DEFAULT 'unknown',
  birthday date NOT NULL,
  email_address varchar(300) NOT NULL,
  telephone varchar(20) NOT NULL,
  phone_type enum('mobile','home','work') NOT NULL DEFAULT 'mobile',
  email_verified enum('Y','N') NOT NULL DEFAULT 'N',
  mobile_verified enum('Y','N') NOT NULL DEFAULT 'N',
  photo_url varchar(300) NOT NULL,
  address_verified enum('Y','N') NOT NULL DEFAULT 'N',
  address_line_1 varchar(300) NOT NULL,
  address_line_2 varchar(300) NOT NULL,
  city varchar(300) NOT NULL,
  state varchar(250) NOT NULL,
  state_id bigint(20) NOT NULL,
  country_code varchar(10) NOT NULL,
  zipcode varchar(10) NOT NULL,
  security_answer varchar(200) NOT NULL,
  signed_up_using varchar(200) NOT NULL,
  user_status enum('pending','active','inactive','deleted') NOT NULL DEFAULT 'pending',
  password_needs_reset enum('Y','N') NOT NULL DEFAULT 'N',
  activation_email_sent enum('Y','N') NOT NULL DEFAULT 'N',
  date_entered datetime NOT NULL,
  _entered_by bigint(20) NOT NULL,
  last_updated datetime NOT NULL,
  _last_updated_by bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


ALTER TABLE activity_log
  ADD PRIMARY KEY (id);

ALTER TABLE help
  ADD PRIMARY KEY (id);

ALTER TABLE message_exchange
  ADD PRIMARY KEY (id),
  ADD FULLTEXT KEY subject_index (`subject`);

ALTER TABLE message_status
  ADD PRIMARY KEY (id),
  ADD UNIQUE KEY _exchange_id (_exchange_id,_user_id,`status`);

ALTER TABLE message_templates
  ADD PRIMARY KEY (id);

ALTER TABLE queries
  ADD PRIMARY KEY (id);

ALTER TABLE users
  ADD PRIMARY KEY (id),
  ADD UNIQUE KEY email_address (email_address),
  ADD FULLTEXT KEY first_name_index (first_name);
ALTER TABLE users
  ADD FULLTEXT KEY last_name_index (last_name);


ALTER TABLE activity_log
  MODIFY id bigint(20) NOT NULL AUTO_INCREMENT;
ALTER TABLE help
  MODIFY id bigint(20) NOT NULL AUTO_INCREMENT;
ALTER TABLE message_exchange
  MODIFY id bigint(20) NOT NULL AUTO_INCREMENT;
ALTER TABLE message_status
  MODIFY id bigint(20) NOT NULL AUTO_INCREMENT;
ALTER TABLE message_templates
  MODIFY id bigint(20) NOT NULL AUTO_INCREMENT;
ALTER TABLE queries
  MODIFY id bigint(20) NOT NULL AUTO_INCREMENT;
ALTER TABLE users
  MODIFY id bigint(20) NOT NULL AUTO_INCREMENT;