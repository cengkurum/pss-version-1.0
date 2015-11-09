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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=21 ;

INSERT INTO activity_trail (id, _user_id, activity_code, result, uri, log_details, ip_address, event_time) VALUES
(1, 1, 'login', 'SUCCESS', 'account/login', 'username=azziwa@gmail.com|device=Other|browser=Firefox', '127.0.0.1', '2015-11-04 23:15:06'),
(2, 1, 'login', 'SUCCESS', 'account/login', 'username=azziwa@gmail.com|device=Other|browser=Firefox', '127.0.0.1', '2015-11-04 23:16:46'),
(3, 0, '', 'success', 'account/logout', '', '127.0.0.1', '2015-11-04 23:20:25'),
(4, 0, 'user_logout', 'success', 'account/logout', 'userid=|email=', '127.0.0.1', '2015-11-04 23:22:53'),
(5, 1, 'login', 'SUCCESS', 'account/login', 'username=admin@pss.gov|device=Other|browser=Firefox', '127.0.0.1', '2015-11-04 23:23:11'),
(6, 1, 'user_logout', 'success', 'account/logout', 'userid=1|email=admin@pss.gov', '127.0.0.1', '2015-11-04 23:23:21'),
(7, 1, 'login', 'SUCCESS', 'account/login', 'username=admin@pss.gov|device=Other|browser=Firefox', '127.0.0.1', '2015-11-05 07:25:31'),
(8, 1, 'user_logout', 'success', 'account/logout', 'userid=1|email=admin@pss.gov', '127.0.0.1', '2015-11-05 07:25:46'),
(9, 1, 'login', 'SUCCESS', 'account/login', 'username=admin@pss.gov|device=Other|browser=Firefox', '127.0.0.1', '2015-11-05 07:37:19'),
(10, 1, 'user_logout', 'success', 'account/logout', 'userid=1|email=admin@pss.gov', '127.0.0.1', '2015-11-05 07:37:45'),
(11, 1, 'login', 'SUCCESS', 'account/login', 'username=admin@pss.gov|device=Other|browser=Firefox', '127.0.0.1', '2015-11-05 07:37:55'),
(12, 1, 'login', 'SUCCESS', 'account/login', 'username=admin@pss.gov|device=Other|browser=Firefox', '127.0.0.1', '2015-11-05 07:39:09'),
(13, 1, 'login', 'SUCCESS', 'account/login', 'username=admin@pss.gov|device=Other|browser=Firefox', '127.0.0.1', '2015-11-05 07:39:39'),
(14, 1, 'login', 'SUCCESS', 'account/login', 'username=admin@pss.gov|device=Other|browser=Firefox', '127.0.0.1', '2015-11-05 07:41:14'),
(15, 1, 'login', 'SUCCESS', 'account/login', 'username=admin@pss.gov|device=Other|browser=Firefox', '127.0.0.1', '2015-11-05 07:42:06'),
(16, 1, 'user_logout', 'success', 'account/logout', 'userid=1|email=admin@pss.gov', '127.0.0.1', '2015-11-05 07:45:49'),
(17, 1, 'login', 'SUCCESS', 'account/login', 'username=admin@pss.gov|device=Other|browser=Firefox', '127.0.0.1', '2015-11-05 07:46:34'),
(18, 1, 'login', 'SUCCESS', 'account/login', 'username=admin@pss.gov|device=Other|browser=Firefox', '127.0.0.1', '2015-11-05 22:30:05'),
(19, 1, 'user_logout', 'success', 'account/logout', 'userid=1|email=admin@pss.gov', '127.0.0.1', '2015-11-05 22:30:33'),
(20, 0, 'user_logout', 'success', 'account/logout', 'userid=|email=', '127.0.0.1', '2015-11-05 23:05:02');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=257 ;

INSERT INTO countries (id, name, short_code) VALUES
(1, 'Aruba', 'ABW'),
(2, 'Afghanistan', 'AFG'),
(3, 'Angola', 'AGO'),
(4, 'Anguilla', 'AIA'),
(5, 'Albania', 'ALB'),
(6, 'Andorra', 'AND'),
(7, 'Netherlands Antilles', 'ANT'),
(8, 'United Arab Emirates', 'ARE'),
(9, 'Argentina', 'ARG'),
(10, 'Armenia', 'ARM'),
(11, 'American Samoa', 'ASM'),
(12, 'Antarctica', 'ATA'),
(13, 'French Southern territories', 'ATF'),
(14, 'Antigua and Barbuda', 'ATG'),
(15, 'Australia', 'AUS'),
(16, 'Austria', 'AUT'),
(17, 'Azerbaijan', 'AZE'),
(18, 'Burundi', 'BDI'),
(19, 'Belgium', 'BEL'),
(20, 'Benin', 'BEN'),
(21, 'Burkina Faso', 'BFA'),
(22, 'Bangladesh', 'BGD'),
(23, 'Bulgaria', 'BGR'),
(24, 'Bahrain', 'BHR'),
(25, 'Bahamas', 'BHS'),
(26, 'Bosnia and Herzegovina', 'BIH'),
(27, 'Belarus', 'BLR'),
(28, 'Belize', 'BLZ'),
(29, 'Bermuda', 'BMU'),
(30, 'Bolivia', 'BOL'),
(31, 'Brazil', 'BRA'),
(32, 'Barbados', 'BRB'),
(33, 'Brunei', 'BRN'),
(34, 'Bhutan', 'BTN'),
(35, 'Bouvet Island', 'BVT'),
(36, 'Botswana', 'BWA'),
(37, 'Central African Republic', 'CAF'),
(38, 'Canada', 'CAN'),
(39, 'Cocos (Keeling) Islands', 'CCK'),
(40, 'Switzerland', 'CHE'),
(41, 'Chile', 'CHL'),
(42, 'China', 'CHN'),
(43, 'Cte dIvoire', 'CIV'),
(44, 'Cameroon', 'CMR'),
(45, 'Congo, The Democratic Republic of the', 'COD'),
(46, 'Congo', 'COG'),
(47, 'Cook Islands', 'COK'),
(48, 'Colombia', 'COL'),
(49, 'Comoros', 'COM'),
(50, 'Cape Verde', 'CPV'),
(51, 'Costa Rica', 'CRI'),
(52, 'Cuba', 'CUB'),
(53, 'Christmas Island', 'CXR'),
(54, 'Cayman Islands', 'CYM'),
(55, 'Cyprus', 'CYP'),
(56, 'Czech Republic', 'CZE'),
(57, 'Germany', 'DEU'),
(58, 'Djibouti', 'DJI'),
(59, 'Dominica', 'DMA'),
(60, 'Denmark', 'DNK'),
(61, 'Dominican Republic', 'DOM'),
(62, 'Algeria', 'DZA'),
(63, 'Ecuador', 'ECU'),
(64, 'Egypt', 'EGY'),
(65, 'Eritrea', 'ERI'),
(66, 'Western Sahara', 'ESH'),
(67, 'Spain', 'ESP'),
(68, 'Estonia', 'EST'),
(69, 'Ethiopia', 'ETH'),
(70, 'Finland', 'FIN'),
(71, 'Fiji Islands', 'FJI'),
(72, 'Falkland Islands', 'FLK'),
(73, 'France', 'FRA'),
(74, 'Faroe Islands', 'FRO'),
(75, 'Micronesia, Federated States of', 'FSM'),
(76, 'Gabon', 'GAB'),
(77, 'United Kingdom', 'GBR'),
(78, 'Georgia', 'GEO'),
(79, 'Ghana', 'GHA'),
(80, 'Gibraltar', 'GIB'),
(81, 'Guinea', 'GIN'),
(82, 'Guadeloupe', 'GLP'),
(83, 'Gambia', 'GMB'),
(84, 'Guinea-Bissau', 'GNB'),
(85, 'Equatorial Guinea', 'GNQ'),
(86, 'Greece', 'GRC'),
(87, 'Grenada', 'GRD'),
(88, 'Greenland', 'GRL'),
(89, 'Guatemala', 'GTM'),
(90, 'French Guiana', 'GUF'),
(91, 'Guam', 'GUM'),
(92, 'Guyana', 'GUY'),
(93, 'Hong Kong', 'HKG'),
(94, 'Heard Island and McDonald Islands', 'HMD'),
(95, 'Honduras', 'HND'),
(96, 'Croatia', 'HRV'),
(97, 'Haiti', 'HTI'),
(98, 'Hungary', 'HUN'),
(99, 'Indonesia', 'IDN'),
(100, 'India', 'IND'),
(101, 'British Indian Ocean Territory', 'IOT'),
(102, 'Ireland', 'IRL'),
(103, 'Iran', 'IRN'),
(104, 'Iraq', 'IRQ'),
(105, 'Iceland', 'ISL'),
(106, 'Israel', 'ISR'),
(107, 'Italy', 'ITA'),
(108, 'Jamaica', 'JAM'),
(109, 'Jordan', 'JOR'),
(110, 'Japan', 'JPN'),
(111, 'Kazakstan', 'KAZ'),
(112, 'Kenya', 'KEN'),
(113, 'Kyrgyzstan', 'KGZ'),
(114, 'Cambodia', 'KHM'),
(115, 'Kiribati', 'KIR'),
(116, 'Saint Kitts and Nevis', 'KNA'),
(117, 'South Korea', 'KOR'),
(118, 'Kuwait', 'KWT'),
(119, 'Laos', 'LAO'),
(120, 'Lebanon', 'LBN'),
(121, 'Liberia', 'LBR'),
(122, 'Libyan Arab Jamahiriya', 'LBY'),
(123, 'Saint Lucia', 'LCA'),
(124, 'Liechtenstein', 'LIE'),
(125, 'Sri Lanka', 'LKA'),
(126, 'Lesotho', 'LSO'),
(127, 'Lithuania', 'LTU'),
(128, 'Luxembourg', 'LUX'),
(129, 'Latvia', 'LVA'),
(130, 'Macao', 'MAC'),
(131, 'Morocco', 'MAR'),
(132, 'Monaco', 'MCO'),
(133, 'Moldova', 'MDA'),
(134, 'Madagascar', 'MDG'),
(135, 'Maldives', 'MDV'),
(136, 'Mexico', 'MEX'),
(137, 'Marshall Islands', 'MHL'),
(138, 'Macedonia', 'MKD'),
(139, 'Mali', 'MLI'),
(140, 'Malta', 'MLT'),
(141, 'Myanmar', 'MMR'),
(142, 'Mongolia', 'MNG'),
(143, 'Northern Mariana Islands', 'MNP'),
(144, 'Mozambique', 'MOZ'),
(145, 'Mauritania', 'MRT'),
(146, 'Montserrat', 'MSR'),
(147, 'Martinique', 'MTQ'),
(148, 'Mauritius', 'MUS'),
(149, 'Malawi', 'MWI'),
(150, 'Malaysia', 'MYS'),
(151, 'Mayotte', 'MYT'),
(152, 'Namibia', 'NAM'),
(153, 'New Caledonia', 'NCL'),
(154, 'Niger', 'NER'),
(155, 'Norfolk Island', 'NFK'),
(156, 'Nigeria', 'NGA'),
(157, 'Nicaragua', 'NIC'),
(158, 'Niue', 'NIU'),
(159, 'Netherlands', 'NLD'),
(160, 'Norway', 'NOR'),
(161, 'Nepal', 'NPL'),
(162, 'Nauru', 'NRU'),
(163, 'New Zealand', 'NZL'),
(164, 'Oman', 'OMN'),
(165, 'Pakistan', 'PAK'),
(166, 'Panama', 'PAN'),
(167, 'Pitcairn', 'PCN'),
(168, 'Peru', 'PER'),
(169, 'Philippines', 'PHL'),
(170, 'Palau', 'PLW'),
(171, 'Papua New Guinea', 'PNG'),
(172, 'Poland', 'POL'),
(173, 'Puerto Rico', 'PRI'),
(174, 'North Korea', 'PRK'),
(175, 'Portugal', 'PRT'),
(176, 'Paraguay', 'PRY'),
(177, 'Palestine', 'PSE'),
(178, 'French Polynesia', 'PYF'),
(179, 'Qatar', 'QAT'),
(180, 'Runion', 'REU'),
(181, 'Romania', 'ROM'),
(182, 'Russian Federation', 'RUS'),
(183, 'Rwanda', 'RWA'),
(184, 'Saudi Arabia', 'SAU'),
(185, 'Sudan', 'SDN'),
(186, 'Senegal', 'SEN'),
(187, 'Singapore', 'SGP'),
(188, 'South Georgia and the South Sandwich Islands', 'SGS'),
(189, 'Saint Helena', 'SHN'),
(190, 'Svalbard and Jan Mayen', 'SJM'),
(191, 'Solomon Islands', 'SLB'),
(192, 'Sierra Leone', 'SLE'),
(193, 'El Salvador', 'SLV'),
(194, 'San Marino', 'SMR'),
(195, 'Somalia', 'SOM'),
(196, 'Saint Pierre and Miquelon', 'SPM'),
(197, 'Sao Tome and Principe', 'STP'),
(198, 'Suriname', 'SUR'),
(199, 'Slovakia', 'SVK'),
(200, 'Slovenia', 'SVN'),
(201, 'Sweden', 'SWE'),
(202, 'Swaziland', 'SWZ'),
(203, 'Seychelles', 'SYC'),
(204, 'Syria', 'SYR'),
(205, 'Turks and Caicos Islands', 'TCA'),
(206, 'Chad', 'TCD'),
(207, 'Togo', 'TGO'),
(208, 'Thailand', 'THA'),
(209, 'Tajikistan', 'TJK'),
(210, 'Tokelau', 'TKL'),
(211, 'Turkmenistan', 'TKM'),
(212, 'East Timor', 'TMP'),
(213, 'Tonga', 'TON'),
(214, 'Trinidad and Tobago', 'TTO'),
(215, 'Tunisia', 'TUN'),
(216, 'Turkey', 'TUR'),
(217, 'Tuvalu', 'TUV'),
(218, 'Taiwan', 'TWN'),
(219, 'Tanzania', 'TZA'),
(220, 'Uganda', 'UGA'),
(221, 'Ukraine', 'UKR'),
(222, 'United States Minor Outlying Islands', 'UMI'),
(223, 'Uruguay', 'URY'),
(224, 'United States', 'USA'),
(225, 'Uzbekistan', 'UZB'),
(226, 'Holy See (Vatican City State)', 'VAT'),
(227, 'Saint Vincent and the Grenadines', 'VCT'),
(228, 'Venezuela', 'VEN'),
(229, 'Virgin Islands, British', 'VGB'),
(230, 'Virgin Islands, U.S.', 'VIR'),
(231, 'Vietnam', 'VNM'),
(232, 'Vanuatu', 'VUT'),
(233, 'Wallis and Futuna', 'WLF'),
(234, 'Samoa', 'WSM'),
(235, 'Yemen', 'YEM'),
(236, 'Yugoslavia', 'YUG'),
(237, 'South Africa', 'ZAF'),
(238, 'Zambia', 'ZMB'),
(239, 'Zimbabwe', 'ZWE'),
(256, 'Republic of South Sudan', 'SSD');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

INSERT INTO organizations (id, name, _owner_user_id, logo_url, description, tax_id, registration_number, _registration_country_id, rop_number, rop_certificate_url, date_established, date_entered, _entered_by, last_updated, _last_updated_by) VALUES
(1, 'South Sudan Procurement', 1, '', 'The government of the republic of South Sudan.', 'T9098032423', '89R08982344', 256, '634523452345', '634523452345.pdf', '2010-11-30', '2015-11-04 00:00:00', 1, '2015-11-04 00:00:00', 1);

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

INSERT INTO permissions (id, code, display, details, category, url, status) VALUES
(1, 'can_send_email', 'Can Send Email', '', '', '', 'active'),
(2, 'can_edit_users', 'Can Edit Users', '', '', 'user/edit', 'active');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

INSERT INTO permission_groups (id, name, type, notes, _default_permission, is_removable, is_system_only, date_added, added_by, last_updated, last_updated_by) VALUES
(1, 'Default Admin', 'admin', 'The default administrator group', 1, 'N', 'Y', '2015-11-04 00:00:00', '1', '2015-11-04 00:00:00', '1');

DROP TABLE IF EXISTS permission_group_mapping;
CREATE TABLE IF NOT EXISTS permission_group_mapping (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  _group_id bigint(20) NOT NULL,
  _permission_id bigint(20) NOT NULL,
  date_added datetime NOT NULL,
  added_by varchar(100) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

INSERT INTO permission_group_mapping (id, _group_id, _permission_id, date_added, added_by) VALUES
(1, 1, 1, '2015-11-04 00:00:00', '1'),
(2, 1, 2, '2015-11-04 00:00:00', '1');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

INSERT INTO queries (id, code, details) VALUES
(1, 'add_event_log', 'INSERT INTO activity_trail (_user_id, activity_code, result, uri, log_details, ip_address, event_time)\nVALUES (''_USER_ID_'', ''_ACTIVITY_CODE_'', ''_RESULT_'', ''_URI_'', ''_LOG_DETAILS_'', ''_IP_ADDRESS_'', NOW())'),
(2, 'get_user_by_name_and_pass', 'SELECT id AS user_id, user_name, email_address, first_name  FROM users WHERE user_name=''_LOGIN_NAME_'' AND password=''_LOGIN_PASSWORD_'' AND status=''active'''),
(3, 'get_user_by_id', 'SELECT U.id, U.id AS user_id, U.first_name, U.last_name, U.email_address, U.email_verified, U.telephone, U._telephone_carrier_id AS carrier_id, U.photo_url, \n(SELECT carrier_name FROM telephone_carriers WHERE id=U._telephone_carrier_id LIMIT 1) AS telephone_carrier, \n(SELECT type FROM permission_groups WHERE id=U._permission_group_id LIMIT 1) AS group_type\n\nFROM users U \nWHERE id=''_USER_ID_'''),
(4, 'get_user_permissions', 'SELECT P.code AS permission_code FROM users U  \nLEFT JOIN permission_group_mapping PM ON (U._permission_group_id=PM._group_id) \nLEFT JOIN permissions P ON (PM._permission_id=P.id) \nWHERE U.id=''_USER_ID_'' AND P.code IS NOT NULL'),
(5, 'get_user_group_type', 'SELECT G.type AS group_type FROM users U \nLEFT JOIN permission_groups G ON (G.id=U._permission_group_id) \nWHERE U.id=''_USER_ID_''');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

INSERT INTO telephone_carriers (id, carrier_name, _country_id, carrier_logo_url, sms_email_domain, mms_email_domain) VALUES
(1, 'MTN Uganda', 220, '', '', 'mms@mtn.co.ug'),
(2, 'Airtel Uganda', 220, '', '', 'mms@airtel.ug'),
(3, 'Uganda Telecom', 220, '', '', 'mms@utl.co.ug'),
(4, 'Africell Uganda', 220, '', '', 'mms@africell.ug'),
(5, 'Smile Telecom', 220, '', '', 'mms@smile.co.ug'),
(6, 'Sure Telecom', 220, '', '', 'mms@ug.smarteastafrica.com'),
(7, 'K2 Telecom', 220, '', '', 'mms@k2telecom.ug'),
(8, 'Smart Telecom', 220, '', '', 'mms@ug.smarteastafrica.com'),
(9, 'Vodafone Uganda', 220, '', '', 'mms@vodafone.ug');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

INSERT INTO users (id, _organization_id, first_name, middle_name, last_name, position, gender, birthday, email_address, telephone, _telephone_carrier_id, email_verified, phone_verified, photo_url, address_line_1, address_line_2, city, state, country, zipcode, user_name, password, _permission_group_id, secret_question, secret_answer, status, registration_start_date, registration_end_date, password_needs_reset, activation_email_sent, date_entered, _entered_by, last_updated, _last_updated_by) VALUES
(1, 1, 'John', 'S', 'Dolres', 'Minister', 'male', '1974-02-23', 'admin@pss.gov', '2324234233', 1, 'Y', 'N', '', '', '', '', '', '', '', 'admin@pss.gov', 'f865b53623b121fd34ee5426c792e5c33af8c227', 1, 'Whats your first pet?', 'Parrot', 'active', '2015-09-08', '2016-05-31', 'N', 'N', '2015-11-04 00:00:00', 1, '2015-11-04 00:00:00', 1);

