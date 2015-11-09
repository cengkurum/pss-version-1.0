DROP TABLE IF EXISTS activity_trail;
CREATE TABLE IF NOT EXISTS activity_trail (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  _user_id bigint(20) NOT NULL,
  activity_code varchar(100) NOT NULL,
  result varchar(100) NOT NULL,
  uri varchar(300) NOT NULL,
  log_details text NOT NULL,
  ip_address varchar(100) NOT NULL,
  event_time datetime NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS bids;
CREATE TABLE IF NOT EXISTS bids (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  _organization_id bigint(20) NOT NULL,
  _submitted_by bigint(20) NOT NULL,
  _tender_notice_id bigint(20) NOT NULL,
  bid_amount float NOT NULL,
  summary text NOT NULL,
  valid_start_date date NOT NULL,
  valid_end_date date NOT NULL,
  `status` enum('saved','submitted','under_review','won','complete','archived') NOT NULL DEFAULT 'saved',
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS bid_documents;
CREATE TABLE IF NOT EXISTS bid_documents (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  _bid_id bigint(20) NOT NULL,
  document_url varchar(300) NOT NULL,
  description varchar(500) NOT NULL,
  date_entered datetime NOT NULL,
  _entered_by bigint(20) NOT NULL,
  last_updated datetime NOT NULL,
  _last_updated_by bigint(20) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS bid_status;
CREATE TABLE IF NOT EXISTS bid_status (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  _bid_id bigint(20) NOT NULL,
  `status` varchar(100) NOT NULL,
  notes varchar(500) NOT NULL,
  end_date datetime NOT NULL,
  date_entered datetime NOT NULL,
  _entered_by bigint(20) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS business_categories;
CREATE TABLE IF NOT EXISTS business_categories (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(300) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS contacts;
CREATE TABLE IF NOT EXISTS contacts (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  contact_type varchar(100) NOT NULL,
  carrier_id varchar(100) NOT NULL,
  details varchar(300) NOT NULL,
  parent_id varchar(100) NOT NULL,
  parent_type varchar(100) NOT NULL,
  date_added datetime NOT NULL,
  is_primary enum('Y','N') NOT NULL DEFAULT 'Y',
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS countries;
CREATE TABLE IF NOT EXISTS countries (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(300) NOT NULL,
  short_code varchar(10) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS event_attendance;
CREATE TABLE IF NOT EXISTS event_attendance (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  _event_id bigint(20) NOT NULL,
  _user_id bigint(20) NOT NULL,
  _organization_id bigint(20) NOT NULL,
  is_confirmed enum('Y','N') NOT NULL DEFAULT 'N',
  notes varchar(500) NOT NULL,
  date_entered datetime NOT NULL,
  _entered_by bigint(20) NOT NULL,
  last_updated datetime NOT NULL,
  _last_updated_by bigint(20) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS event_notifications;
CREATE TABLE IF NOT EXISTS event_notifications (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(300) NOT NULL,
  description text NOT NULL,
  start_date datetime NOT NULL,
  end_date datetime NOT NULL,
  location varchar(300) NOT NULL,
  event_type varchar(200) NOT NULL,
  `status` enum('saved','published','active','archived') NOT NULL DEFAULT 'saved',
  date_entered datetime NOT NULL,
  _entered_by bigint(20) NOT NULL,
  last_updated datetime NOT NULL,
  _last_updated_by bigint(20) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS experience;
CREATE TABLE IF NOT EXISTS experience (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  _owner_organization_id bigint(20) NOT NULL,
  client_organization_name varchar(300) NOT NULL,
  client_rop_organization_id bigint(20) NOT NULL,
  project_title varchar(300) NOT NULL,
  project_details text NOT NULL,
  project_start_date datetime NOT NULL,
  project_end_date datetime NOT NULL,
  project_current_status varchar(100) NOT NULL DEFAULT 'pending',
  reference_link varchar(300) NOT NULL,
  reference_information varchar(500) NOT NULL,
  client_contact_telephone varchar(20) NOT NULL,
  _project_country_id bigint(20) NOT NULL,
  date_entered datetime NOT NULL,
  _entered_by bigint(20) NOT NULL,
  last_updated datetime NOT NULL,
  _last_updated_by bigint(20) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS faqs;
CREATE TABLE IF NOT EXISTS faqs (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  question varchar(300) NOT NULL,
  answer varchar(500) NOT NULL,
  number_of_views bigint(20) NOT NULL,
  document_url varchar(300) NOT NULL,
  `status` enum('submitted','active','archived') NOT NULL DEFAULT 'submitted',
  date_entered datetime NOT NULL,
  _entered_by bigint(20) NOT NULL,
  last_updated datetime NOT NULL,
  _last_updated_by bigint(20) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS help;
CREATE TABLE IF NOT EXISTS `help` (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  help_code varchar(100) NOT NULL,
  title varchar(300) NOT NULL,
  details text NOT NULL,
  _entered_by bigint(20) DEFAULT NULL,
  is_active enum('Y','N') NOT NULL DEFAULT 'Y',
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS lines_of_business;
CREATE TABLE IF NOT EXISTS lines_of_business (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  _organization_id bigint(20) NOT NULL,
  _business_category_id bigint(20) NOT NULL,
  `name` varchar(500) NOT NULL,
  date_entered datetime NOT NULL,
  _entered_by bigint(20) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS line_of_business_products;
CREATE TABLE IF NOT EXISTS line_of_business_products (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  _business_line_id bigint(20) NOT NULL,
  _product_id bigint(20) NOT NULL,
  date_entered datetime NOT NULL,
  _entered_by bigint(20) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS message_exchange;
CREATE TABLE IF NOT EXISTS message_exchange (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  _template_id bigint(20) DEFAULT NULL,
  details text NOT NULL,
  `subject` varchar(300) NOT NULL,
  attachment_url varchar(300) NOT NULL,
  _sender_id bigint(20) DEFAULT NULL,
  _recipient_id bigint(20) DEFAULT NULL,
  date_entered datetime NOT NULL,
  PRIMARY KEY (id),
  FULLTEXT KEY subject_index (`subject`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS message_status;
CREATE TABLE IF NOT EXISTS message_status (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  _exchange_id bigint(20) DEFAULT NULL,
  _user_id bigint(20) DEFAULT NULL,
  `status` enum('received','read','replied','archived') NOT NULL DEFAULT 'received',
  date_entered datetime NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY _exchange_id (_exchange_id,_user_id,`status`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS message_templates;
CREATE TABLE IF NOT EXISTS message_templates (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  message_type varchar(100) NOT NULL,
  `subject` varchar(300) NOT NULL,
  details text NOT NULL,
  sms varchar(160) NOT NULL,
  copy_admin enum('Y','N') NOT NULL DEFAULT 'N',
  date_entered datetime NOT NULL,
  _entered_by bigint(20) DEFAULT NULL,
  last_updated datetime NOT NULL,
  _last_updated_by bigint(20) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS organizations;
CREATE TABLE IF NOT EXISTS organizations (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(300) NOT NULL,
  _owner_user_id bigint(20) NOT NULL,
  logo_url varchar(300) NOT NULL,
  description text NOT NULL,
  tax_id varchar(300) NOT NULL,
  registration_number varchar(300) NOT NULL,
  _registration_country_id bigint(20) NOT NULL,
  rop_number varchar(200) NOT NULL,
  rop_certificate_url varchar(200) NOT NULL,
  date_established date NOT NULL,
  date_entered datetime NOT NULL,
  _entered_by bigint(20) NOT NULL,
  last_updated datetime NOT NULL,
  _last_updated_by bigint(20) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS payment_status;
CREATE TABLE IF NOT EXISTS payment_status (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  _user_id int(11) NOT NULL,
  payment_method varchar(100) NOT NULL,
  _payment_option bigint(20) NOT NULL,
  paid_amount float NOT NULL,
  payment_code varchar(300) NOT NULL,
  is_payment_waivered enum('Y','N') NOT NULL DEFAULT 'N',
  transaction_status enum('pending','complete','deleted') NOT NULL DEFAULT 'pending',
  transaction_start_date datetime NOT NULL,
  transaction_end_date datetime NOT NULL,
  date_entered datetime NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS permissions;
CREATE TABLE IF NOT EXISTS permissions (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(200) NOT NULL,
  display varchar(300) NOT NULL,
  details varchar(300) NOT NULL,
  category varchar(200) NOT NULL,
  url varchar(300) NOT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  PRIMARY KEY (id),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS permission_groups;
CREATE TABLE IF NOT EXISTS permission_groups (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(300) NOT NULL,
  `type` varchar(100) NOT NULL,
  notes text NOT NULL,
  _default_permission bigint(20) NOT NULL,
  is_removable enum('Y','N') NOT NULL DEFAULT 'Y',
  is_system_only enum('Y','N') NOT NULL DEFAULT 'N',
  date_added datetime NOT NULL,
  added_by varchar(100) NOT NULL,
  last_updated datetime NOT NULL,
  last_updated_by varchar(100) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS permission_group_mapping;
CREATE TABLE IF NOT EXISTS permission_group_mapping (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  _group_id bigint(20) NOT NULL,
  _permission_id bigint(20) NOT NULL,
  date_added datetime NOT NULL,
  added_by varchar(100) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS products;
CREATE TABLE IF NOT EXISTS products (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(300) NOT NULL,
  _business_category_id bigint(20) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS projects;
CREATE TABLE IF NOT EXISTS projects (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  _source_bid_id bigint(20) NOT NULL,
  `name` varchar(300) NOT NULL,
  description text NOT NULL,
  _pde_contact_id bigint(20) NOT NULL,
  _contractor_contact_id bigint(20) NOT NULL,
  expected_start_date date NOT NULL,
  expected_end_date date NOT NULL,
  date_entered datetime NOT NULL,
  _entered_by bigint(20) NOT NULL,
  last_updated datetime NOT NULL,
  _last_updated_by bigint(20) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS project_status;
CREATE TABLE IF NOT EXISTS project_status (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  _project_id bigint(20) NOT NULL,
  `status` varchar(100) NOT NULL,
  notes varchar(500) NOT NULL,
  end_date datetime NOT NULL,
  date_entered datetime NOT NULL,
  _entered_by bigint(20) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS project_status_documents;
CREATE TABLE IF NOT EXISTS project_status_documents (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  _project_status_id bigint(20) NOT NULL,
  document_url varchar(300) NOT NULL,
  date_entered datetime NOT NULL,
  _entered_by bigint(20) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS queries;
CREATE TABLE IF NOT EXISTS queries (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(300) NOT NULL,
  details text NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

INSERT INTO queries (id, code, details) VALUES
(1, 'add_event_log', 'INSERT INTO activity_log (user_id, activity_code, result, uri, log_details, ip_address, event_time)\r\nVALUES (''_USER_ID_'', ''_ACTIVITY_CODE_'', ''_RESULT_'', ''_URI_'', ''_LOG_DETAILS_'', ''_IP_ADDRESS_'', NOW())'),
(2, 'get_user_by_name_and_pass', 'SELECT * FROM users WHERE user_name=''_LOGIN_NAME_'' AND password=''_LOGIN_PASSWORD_'' AND status=''active''');

DROP TABLE IF EXISTS registration_status_track;
CREATE TABLE IF NOT EXISTS registration_status_track (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  _organization_id bigint(20) NOT NULL,
  `status` varchar(100) NOT NULL,
  reason varchar(500) NOT NULL,
  start_date datetime NOT NULL,
  end_date datetime NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS secret_questions;
CREATE TABLE IF NOT EXISTS secret_questions (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  question varchar(500) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS status_change_suggestion;
CREATE TABLE IF NOT EXISTS status_change_suggestion (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  _organization_id bigint(20) NOT NULL,
  _suggesting_organization_id bigint(20) NOT NULL,
  _submitted_by bigint(20) NOT NULL,
  reason text NOT NULL,
  `status` varchar(100) NOT NULL,
  date_entered datetime NOT NULL,
  last_updated datetime NOT NULL,
  _last_updated_by bigint(20) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS system_documents;
CREATE TABLE IF NOT EXISTS system_documents (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  document_url varchar(300) NOT NULL,
  `name` varchar(300) NOT NULL,
  description varchar(500) NOT NULL,
  document_type varchar(100) NOT NULL,
  date_entered datetime NOT NULL,
  _entered_by bigint(20) NOT NULL,
  last_updated datetime NOT NULL,
  _last_updated_by bigint(20) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS system_links;
CREATE TABLE IF NOT EXISTS system_links (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  link_url varchar(500) NOT NULL,
  description varchar(500) NOT NULL,
  link_type varchar(100) NOT NULL,
  date_entered datetime NOT NULL,
  _entered_by bigint(20) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS telephone_carriers;
CREATE TABLE IF NOT EXISTS telephone_carriers (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  carrier_name varchar(100) NOT NULL,
  _country_id bigint(20) NOT NULL,
  carrier_logo_url varchar(200) NOT NULL,
  sms_email_domain varchar(250) NOT NULL,
  mms_email_domain varchar(250) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS turnover;
CREATE TABLE IF NOT EXISTS turnover (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  _organization_id bigint(20) NOT NULL,
  financial_year varchar(10) NOT NULL,
  amount bigint(20) NOT NULL,
  is_verified enum('Y','N') NOT NULL DEFAULT 'N',
  date_entered datetime NOT NULL,
  _entered_by bigint(20) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  _organization_id bigint(20) NOT NULL,
  first_name varchar(300) NOT NULL,
  middle_name varchar(200) NOT NULL,
  last_name varchar(300) NOT NULL,
  position varchar(300) NOT NULL,
  gender enum('male','female','unknown') NOT NULL DEFAULT 'unknown',
  birthday date NOT NULL,
  email_address varchar(300) NOT NULL,
  telephone varchar(20) NOT NULL,
  _telephone_carrier_id bigint(20) NOT NULL,
  email_verified enum('Y','N') NOT NULL DEFAULT 'N',
  phone_verified enum('Y','N') NOT NULL DEFAULT 'N',
  photo_url varchar(300) NOT NULL,
  address_line_1 varchar(300) NOT NULL,
  address_line_2 varchar(300) NOT NULL,
  city varchar(300) NOT NULL,
  state varchar(250) NOT NULL,
  country varchar(300) NOT NULL,
  zipcode varchar(10) NOT NULL,
  user_name varchar(300) NOT NULL,
  `password` varchar(500) NOT NULL,
  _permission_group_id bigint(20) NOT NULL,
  secret_question varchar(500) NOT NULL,
  secret_answer varchar(200) NOT NULL,
  `status` enum('pending','active','inactive','deleted') NOT NULL DEFAULT 'pending',
  registration_start_date date NOT NULL,
  registration_end_date date NOT NULL,
  password_needs_reset enum('Y','N') NOT NULL DEFAULT 'N',
  activation_email_sent enum('Y','N') NOT NULL DEFAULT 'N',
  date_entered datetime NOT NULL,
  _entered_by bigint(20) NOT NULL,
  last_updated datetime NOT NULL,
  _last_updated_by bigint(20) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY email_address (email_address),
  FULLTEXT KEY first_name_index (first_name),
  FULLTEXT KEY last_name_index (last_name)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;
