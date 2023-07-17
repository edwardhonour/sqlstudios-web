<?php

ini_set('display_errors',1);
error_reporting(E_ERROR | E_PARSE);
ini_set('display_startup_errors',1);
header('Access-Control-Allow-Headers: Access-Control-Allow-Origin, Content-Type, Authorization');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET,PUT,POST,DELETE,PATCH,OPTIONS');
require_once('class.PSDB.php');

$X=new PSDB();

$sql="select * from doc_workspace order by id";
$r=$X->sql($sql);

foreach($r as $s) {

    $post=array();
    $post['table_name']="doc_workspace_acl";
    $post['action']="insert";
    $post['workspace_id']=$s['id'];
    $post['user_id']=1;
    $post['workspace_access_type_id']=1;
    $post['user_name']="Edward Honour";
    $post['access_type']="Full Control";
    $i=$X->post($post);

    $post=array();
    $post['table_name']="doc_workspace_acl";
    $post['action']="insert";
    $post['workspace_id']=$s['id'];
    $post['user_id']=523;
    $post['workspace_access_type_id']=1;
    $post['user_name']="Jeff Lozinski (admin)";
    $post['access_type']="Full Control";
    $i=$X->post($post);

    $post=array();
    $post['table_name']="doc_workspace_acl";
    $post['action']="insert";
    $post['workspace_id']=$s['id'];
    $post['user_id']=49;
    $post['workspace_access_type_id']=1;
    $post['user_name']="Jason Scarpetta";
    $post['access_type']="Full Control";
    $i=$X->post($post);

    $post=array();
    $post['table_name']="doc_workspace_acl";
    $post['action']="insert";
    $post['workspace_id']=$s['id'];
    $post['user_id']=502;
    $post['workspace_access_type_id']=1;
    $post['user_name']="Joseph Lehman";
    $post['access_type']="Full Control";
    $i=$X->post($post);


    $post=array();
    $post['table_name']="doc_document";
    $post['action']="insert";
    $post['doc_type_id']=5;
    $post['workspace_id']=$s['id'];
    $post['user_id']=49;
    $post['document_name']="Purchase Order - Covalent";
    $post['document_dsc']="Blanket purchase order - Tricleanz Hand Sanitizer for Costco";
    $post['workgroup_id']=1;
    $post['storage_key']=hash('sha256',$s['id'.$post['document_dsc']]);
    $i=$X->post($post);
    $ss="update doc_document set create_timestamp = '" . $s['create_timestamp'] . "' where id = " . $i;
    $X->execute($ss);

    $post=array();
    $post['table_name']="doc_document";
    $post['action']="insert";
    $post['doc_type_id']=5;
    $post['workspace_id']=$s['id'];
    $post['user_id']=49;
    $post['document_name']="Safety Data Sheet - Tricleanz from Covalent";
    $post['document_dsc']="SDS - Tricleanz";
    $post['workgroup_id']=1;
    $post['storage_key']=hash('sha256',$s['id'.$post['document_dsc']]);
    $i=$X->post($post);
    $ss="update doc_document set create_timestamp = '" . $s['create_timestamp'] . "' where id = " . $i;
    $X->execute($ss);

    $post=array();
    $post['table_name']="doc_document_shares";
    $post['action']="insert";
    $post['doc_type_id']=5;
    $post['doc_id']=$i;
    $post['user_id']=49;
    $post['shared_by_id']=49;
    $i=$X->post($post);
    $ss="update doc_document set create_timestamp = '" . $s['create_timestamp'] . "' where id = " . $i;
    $X->execute($ss);

    $post=array();
    $post['table_name']="doc_document";
    $post['action']="insert";
    $post['doc_type_id']=5;
    $post['workspace_id']=$s['id'];
    $post['user_id']=49;
    $post['document_name']="Certificate of Analysis";
    $post['document_dsc']="COA";
    $post['workgroup_id']=1;
    $post['storage_key']=hash('sha256',$s['id'.$post['document_dsc']]);
    $i=$X->post($post);
    $ss="update doc_document set create_timestamp = '" . $s['create_timestamp'] . "' where id = " . $i;
    $X->execute($ss);

    $post=array();
    $post['table_name']="doc_document_shares";
    $post['action']="insert";
    $post['doc_type_id']=5;
    $post['doc_id']=$i;
    $post['user_id']=49;
    $post['shared_by_id']=49;
    $i=$X->post($post);
    $ss="update doc_document set create_timestamp = '" . $s['create_timestamp'] . "' where id = " . $i;
    $X->execute($ss);

    $post=array();
    $post['table_name']="doc_document";
    $post['action']="insert";
    $post['doc_type_id']=5;
    $post['workspace_id']=$s['id'];
    $post['user_id']=49;
    $post['document_name']="Bill of Lading from Covalent";
    $post['document_dsc']="BLADING";
    $post['workgroup_id']=1;
    $post['storage_key']=hash('sha256',$s['id'.$post['document_dsc']]);
    $i=$X->post($post);
    $ss="update doc_document set create_timestamp = '" . $s['create_timestamp'] . "' where id = " . $i;
    $X->execute($ss);

    $post=array();
    $post['table_name']="doc_document";
    $post['action']="insert";
    $post['doc_type_id']=5;
    $post['workspace_id']=$s['id'];
    $post['user_id']=49;
    $post['document_name']="Signed Bill of Lading";
    $post['document_dsc']="Signed bill of lading with shipper invoice.";
    $post['workgroup_id']=1;
    $post['storage_key']=hash('sha256',$s['id'.$post['document_dsc']]);
    $i=$X->post($post);
    $ss="update doc_document set create_timestamp = '" . $s['create_timestamp'] . "' where id = " . $i;
    $X->execute($ss);


    $post=array();
    $post['table_name']="doc_document";
    $post['action']="insert";
    $post['doc_type_id']=5;
    $post['workspace_id']=$s['id'];
    $post['user_id']=49;
    $post['document_name']="Invoice Costco";
    $post['document_dsc']="Costco Invoice";
    $post['workgroup_id']=1;
    $post['storage_key']=hash('sha256',$s['id'.$post['document_dsc']]);
    $i=$X->post($post);
    $ss="update doc_document set create_timestamp = '" . $s['create_timestamp'] . "' where id = " . $i;
    $X->execute($ss);
    

    $post=array();
    $post['table_name']="doc_document";
    $post['action']="insert";
    $post['doc_type_id']=5;
    $post['workspace_id']=$s['id'];
    $post['user_id']=49;
    $post['document_name']="Covalent Chemical Invoice";
    $post['document_dsc']="Automatically generated invoice.";
    $post['workgroup_id']=1;
    $post['storage_key']=hash('sha256',$s['id'.$post['document_dsc']]);
    $i=$X->post($post);
    $ss="update doc_document set create_timestamp = '" . $s['create_timestamp'] . "' where id = " . $i;
    $X->execute($ss);
     

}

?>