<?php
if(!empty($t) && $t == 'administrator'){
	echo "Use this account type if you are an administrator on this procurement system.";
}
else if(!empty($t) && $t == 'government_agency'){
	echo "Use this account type if you are simply a government agency who would like to use this system offer and track tender notices.";
}
else if(!empty($t) && $t == 'pde'){
	echo "Use this account type if you would like to use this system for procurement or disposal of supplies.";
}
else if(!empty($t) && $t == 'provider'){
	echo "Use this account type if you wish to submit bids to organizations for work.";
}

?>