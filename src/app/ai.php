<?php

ini_set('display_errors',1);
error_reporting(E_ERROR | E_PARSE);
ini_set('display_startup_errors',1);
header('Access-Control-Allow-Headers: Access-Control-Allow-Origin, Content-Type, Authorization');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET,PUT,POST,DELETE,PATCH,OPTIONS');
require_once('class.PSDB.php');

class SQLLabsAI {

        protected $dbh;
        protected $db;

		protected $table_name;
		protected $base_table;
		protected $cols;

		//-- forms
		protected $form_selector;
		protected $form_class_name;
		protected $form_directory;
		protected $form_ts_file;
		protected $form_template_file;
		protected $form_css_file;

		//-- tables
		protected $table_selector;
		protected $table_directory;
		protected $table_class_name;
		protected $table_ts_file;
		protected $table_template_file;
		protected $table_css_file;

		//-- panels

		protected $panel_selector;
		protected $panel_class_name;
		protected $panel_directory;
		protected $panel_ts_file;
		protected $panel_template_file;
		protected $panel_css_file;

		//-- dashboards

		protected $dashboard_directory;
		protected $dashboard_selector;
		protected $dashboard_class_name;
		protected $dashboard_ts_file;
		protected $dashboard_template_file;
		protected $dashboard_css_file;
		public $child_table_array;
		public $child_panel_array;
		protected $foreign_key;
		
		public $child_panels;
		public $child_tables;

		protected $base_dir;
		protected $post;

		function __construct() {
			$this->post=array();
			$this->post['files']=array();
			$this->base_dir="/home/protective/public_html/api/files";
		}

	    function send_zip() {
            $zip = new ZipArchive(); 
            $zip_name = time().".zip"; 
            if($zip->open($zip_name, ZIPARCHIVE::CREATE)!==TRUE) { 
                    die("* Sorry ZIP creation failed.");
            }
            foreach($this->post['files'] as $file) { 
                $zip->addFile($file); 
            }
            $zip->close();
            if(file_exists($zip_name)) {
                header('Content-type: application/zip');
                header('Content-Disposition: attachment; filename="'.$zip_name.'"');
                readfile($zip_name);
                unlink($zip_name);
            }
		}

		function is_json($data) {
    		if (!empty($data)) {
        	    return is_string($data) && 
          	    is_array(json_decode($data, true)) ? true : false;
    		}
    		return false;
		}

		function get_cols($table) {
			$X=new PSDB();
            $c=$X->get_cols($table);
            $this->cols=array();
			foreach($c as $d) {
				$sql="select * from sql_labels where column_name = '" . $d['Field'] . "'";
				$i=$X->sql($sql);
				if (sizeof($i)>0) {
					$d['Label']=$i[0]['label'];
				} else {
					$d['Label']=$d['Field'];
				}
				array_push($this->cols,$d);
                 $sql="select * from sql_ri where column_name = '" . $d['Field'] . "'";
				 $h=$X->sql($sql);
				 if (sizeof($h)>0) {
					$t=array();
					$t['Field']=$h[0]['col'];
					$t['Comment']="RI";
					$t['Type']="";
					$sql="select * from sql_labels where column_name = '" . $t['Field'] . "'";
					$i=$X->sql($sql);
					if (sizeof($i)>0) {
						$t['Label']=$i[0]['label'];
					} else {
						$t['Label']=$d['Field'];
					}
					array_push($this->cols,$t);
				 }
			}
		}

        function derive_class_name($table, $type) {

			$array=explode("-",$table);
			$class_name="";
			foreach($array as $a) {
    			 $class_name .= ucfirst($a);
			}
			$class_name=$class_name . ucfirst($type);
			$class_name.="Component";
			return $class_name;

		}

		function print_sql_input($file, $col, $dstyle, $dlabel) { 
			fwrite($file,"    <sql-input");
			fwrite($file," [col]=\"'" . $col['Field'] . "'\"");
			fwrite($file," [style]=\"'" . $dstyle . "'\"");
			fwrite($file," [label]=\"'" . $col['Label'] . "'\">\r\n");
			fwrite($file,"    </sql-input>\r\n\r\n");
		} 

		function print_sql_select($file, $col, $dstyle, $dlabel, $dsql) { 
			fwrite($file,"   <sql-data-select");
			fwrite($file," [col]=\"'" . $col['Field'] . "'\"");
			fwrite($file," [style]=\"'" . $dstyle . "'\"");
			fwrite($file," [label]=\"'" . $col['Label'] . "'\"");
			fwrite($file," [sql]=\"'" . $dsql . "'\">\r\n");
			fwrite($file,"   </sql-data-select>\r\n \r\n");
		}	 

		function print_sql_radio($file, $col, $dstyle, $dlabel, $dsql) { 
			fwrite($file, "   <sql-radio-group");
			fwrite($file, " [col]=\"'" . $col['Field'] . "'\"");
			fwrite($file, " [style]=\"'" . $dstyle . "'\"");
			fwrite($file, " [label]=\"'" . $col['Label'] . "'\"\r\n");
			fwrite($file, "      [sql]=\"'" . $dsql . "'\">\r\n");
			fwrite($file, "   </sql-radio-group>\r\n \r\n");
		} 

		function print_sql_datepicker($file, $col, $dstyle, $dlabel) { 
			fwrite($file,"   <sql-datepicker");
			fwrite($file," [col]=\"'" . $col['Field'] . "'\"");
			fwrite($file," [style]=\"'" . $dstyle . "'\"");
			fwrite($file," [label]=\"'" . $col['Label'] . "'\">\r\n");
			fwrite($file,"    </sql-datepicker>\r\n \r\n");
		}	 

		function print_sql_checkbox($file, $col, $dstyle) { 
			fwrite($file,"  <sql-checkbox ");
			fwrite($file,"     [col]=\"'" . $col['Field'] . "'\"");
			fwrite($file,"     [style]=\"'" . $dstyle . "'\"");
			fwrite($file,"     [label]=\"'" . $col['Label'] . "'\"");
			fwrite($file,"  </sql-checkbox>\r\n \r\n");
		} 

		function print_sql_textarea($file, $col, $dstyle) { 
			fwrite($file,"  <sql-textarea ");
			fwrite($file,"     [col]=\"'" . $col['Field'] ."'\"");
			fwrite($file,"     [style]=\"'" . $dstyle . "'\"");
			fwrite($file,"     [label]=\"'" . $col['Label'] . "'\"");
			fwrite($file,"  </sql-textarea>\r\n \r\n");
		} 

		function print_sql_editor($file, $col, $dstyle) { 
			fwrite($file,"  <sql-editor ");
			fwrite($file,"     [col]=\"'" . $col['Field'] ."'\"");
			fwrite($file,"     [style]=\"'" . $dstyle . "'\"");
			fwrite($file,"     [label]=\"'" . $col['Label'] . "'\"></sql-editor>\r\n");
		} 

		function create_form() {

			//-- Module
			fwrite($this->form_ts_file,"import { Component } from '@angular/core';\r\n");
			fwrite($this->form_ts_file,"import { CommonModule } from '@angular/common';\r\n");
			fwrite($this->form_ts_file,"import { SqlComponentsModule, SqlDataSelectComponent, SqlDeleteComponent, SqlSubmitComponent } from 'sql-components';\r\n");
			fwrite($this->form_ts_file,"import {MatDialogModule} from '@angular/material/dialog';\r\n");
			fwrite($this->form_ts_file,"\r\n");
			fwrite($this->form_ts_file,"\r\n");
			fwrite($this->form_ts_file,"@Component({\r\n");
			fwrite($this->form_ts_file,"  selector: '" . $this->form_selector . "',\r\n");
			fwrite($this->form_ts_file,"  standalone: true,\r\n");
			fwrite($this->form_ts_file,"  imports: [CommonModule, SqlComponentsModule, SqlSubmitComponent, SqlDataSelectComponent, SqlDeleteComponent, MatDialogModule], \r\n");
			fwrite($this->form_ts_file,"  templateUrl: './" . $this->form_directory . ".component.html',\r\n"); 
			fwrite($this->form_ts_file,"  styleUrls: ['./" . $this->form_directory . ".component.css']\r\n");
			fwrite($this->form_ts_file," })\r\n");
			fwrite($this->form_ts_file," export class " . $this->form_class_name . " {\r\n");
			fwrite($this->form_ts_file," \r\n");
			fwrite($this->form_ts_file,"}\r\n");
			fwrite($this->form_ts_file,"\r\n");
			fwrite($this->form_ts_file,"\r\n");	   
			fclose($this->form_ts_file);

			//- Template
			$ccount=0;
			$count=1;
			foreach($this->cols as $c) if ($c['Field']!="id" && $c['Field']!="create_timestamp") $count++;   

			$percount=round($count/3,0);
			if ($percount==0) $percount=1;
			fwrite($this->form_template_file,"<sql-form \r\n");
			fwrite($this->form_template_file," [table]=\"'" . $this->table_name . "'\" [embedded]=\"'Y'\"\r\n");
			fwrite($this->form_template_file," [title]=\"'" . $this->table_name . "'\"\r\n");
			fwrite($this->form_template_file," [id]=\"'0'\" [id2]=\"''\" [id3]=\"''\"\r\n"); 
			fwrite($this->form_template_file," [default_col]= \"''\" [default_value]=\"''\">\r\n");
			fwrite($this->form_template_file,"\r\n  \r\n");
			fwrite($this->form_template_file,"<div class=\"row\">\r\n");

			fwrite($this->form_template_file,"<div class=\"col-sm-12 col-lg-6 col-xl-4\">\r\n");

			$ccount++;
			$i=1;
			foreach ($this->cols as $col) {
				if ($col['Field']!='id'&&$col['Field']!='create_timestamp') {
	  				$dtype="";
					$c=$col['Comment'];
					if ($c!="") {
						$dsql="select id, option from " . $c . " order by 2";	
					} else {
	   			 		$dsql="";						
					}

			    	$dtype="hidden";
					$r=$col['Field'];
					$r=str_replace("_"," ",$r);
					$r=ucfirst($r);

     				$dlabel=$r;


     				$dstyle="width:400px;";

	     			if (strpos($col['Type'],"varchar")!==false) $dtype="input";
    	 			if (strpos($col['Type'],"int")!==false) $dtype="select";
     				if (strpos($col['Type'],"date")!==false) $dtype="datepicker";
    
				    $c=$col['Comment'];
     				if ($this->is_json($c)) {
     	  				$json=json_decode($c,true);
          				if (isset($json['form_type'])) $dtype=$json['form_type'];
          				if (isset($json['form_style'])) $dstyle=$json['form_style'];
                    	if (isset($json['form'])) $dlabel=$json['form']; 
			    	 }
 
		     	if ($dtype=='input') $this->print_sql_input($this->form_template_file,$col, $dstyle, $dlabel);
 		     	if ($dtype=='select') $this->print_sql_select($this->form_template_file,$col, $dstyle, $dlabel, $dsql);
    		 	if ($dtype=='radio') $this->print_sql_radio($this->form_template_file,$col, $dstyle, $dlabel, $dsql);
		     	if ($dtype=='datepicker') $this->print_sql_datepicker($this->form_template_file,$col, $dstyle, $dlabel);
  			 	if ($dtype=='checkbox') $this->print_sql_checkbox($this->form_template_file,$col, $dstyle, $dlabel, $dsql);
  		     	if ($dtype=='textarea') $this->print_sql_textarea($this->form_template_file,$col, $dstyle, $dlabel);
		     	if ($dtype=='editor') $this->print_sql_editor($this->form_template_file,$col, $dstyle, $dlabel);
     
		     	$i++;
     		 	if ($i>$percount) {     
         			$i=1; 
         			fwrite($this->form_template_file,"</div>\r\n");   
         			fwrite($this->form_template_file,"<div class=\"col-sm-12 col-lg-6 col-xl-4\">\r\n");  
					$ccount++;
     			}
			   }
			}
			if ($ccount==1) {
				fwrite($this->form_template_file,"</div>\r\n");   
				fwrite($this->form_template_file,"<div class=\"col-sm-12 col-lg-6 col-xl-4\">\r\n");  
				fwrite($this->form_template_file,"</div>\r\n");   
				fwrite($this->form_template_file,"</div>\r\n");   
				fwrite($this->form_template_file,"<div class=\"col-sm-12 col-lg-6 col-xl-4\">\r\n");  
			}
			if ($ccount==2) {
				fwrite($this->form_template_file,"</div>\r\n");   
				fwrite($this->form_template_file,"<div class=\"col-sm-12 col-lg-6 col-xl-4\">\r\n");  
			}

			fwrite($this->form_template_file,"<div class=\"row\">\r\n");
			fwrite($this->form_template_file,"<div class=\"col-sm-12\">\r\n");  
			fwrite($this->form_template_file,"<sql-submit></sql-submit><sql-delete></sql-delete>\r\n");
			fwrite($this->form_template_file,"</div>\r\n");   
			fwrite($this->form_template_file,"</div>\r\n");   
			fwrite($this->form_template_file,"</div>\r\n");   
			fwrite($this->form_template_file,"</div>\r\n");   
			fwrite($this->form_template_file,"</sql-form>\r\n"); 
			fwrite($this->form_template_file,"\r\n");
                   
	    }

		function create_list($sql, $cols) {

			fwrite($this->table_ts_file, "import { Component, Input, Output, EventEmitter } from '@angular/core';\r\n");
			fwrite($this->table_ts_file, "import { CommonModule } from '@angular/common';\r\n");
			fwrite($this->table_ts_file, "import { Router } from '@angular/router';\r\n");
			fwrite($this->table_ts_file, "import { SqlComponentsModule } from 'sql-components';\r\n");
			fwrite($this->table_ts_file, "\r\n");
			fwrite($this->table_ts_file, "\r\n");
			fwrite($this->table_ts_file, "@Component({\r\n");
			fwrite($this->table_ts_file, "  selector: '" . $this->table_selector . "',\r\n");
			fwrite($this->table_ts_file, "  standalone: true,\r\n");
			fwrite($this->table_ts_file, "  imports: [CommonModule, SqlComponentsModule], \r\n");
			fwrite($this->table_ts_file, "  templateUrl: './" . $this->table_directory . ".component.html',\r\n");
			fwrite($this->table_ts_file, "  styleUrls: ['./" . $this->table_directory . ".component.css']\r\n");
			fwrite($this->table_ts_file, "})\r\n");
			fwrite($this->table_ts_file, "export class " . $this->table_class_name . " {\r\n");
			fwrite($this->table_ts_file, " \r\n");
			fwrite($this->table_ts_file, "  @Output() button_click: EventEmitter<any> = new EventEmitter<any>();\r\n");
			fwrite($this->table_ts_file, "  @Output() row_click: EventEmitter<any> = new EventEmitter<any>();\r\n");
			fwrite($this->table_ts_file, "\r\n");
			fwrite($this->table_ts_file, "  constructor (private _router: Router ) {}\r\n");
			fwrite($this->table_ts_file, "\r\n");
			fwrite($this->table_ts_file, "processButton(m: any) {\r\n");
			fwrite($this->table_ts_file, " this.button_click.emit(m);\r\n");
			fwrite($this->table_ts_file, " this._router.navigate(['/" . $this->dashboard_selector . "',m.id]);\r\n");
			fwrite($this->table_ts_file, "}\r\n");
			fwrite($this->table_ts_file, "\r\n");
			fwrite($this->table_ts_file, "processRow(m: any) {\r\n");
			fwrite($this->table_ts_file, " this.row_click.emit(m);\r\n");
			fwrite($this->table_ts_file, "}\r\n");
			fwrite($this->table_ts_file, "\r\n");
			fwrite($this->table_ts_file, "}\r\n");
			fclose($this->table_ts_file);

			fwrite($this->table_template_file, "<sql-table [title]=\"'Title Goes Here'\"\r\n");
			fwrite($this->table_template_file, "  (row_click)=\"processRow(\$event)\"\r\n");		
			fwrite($this->table_template_file, "  (button_click)=\"processButton(\$event)\"\r\n");			
			fwrite($this->table_template_file, "  [sql]=\"'" . $sql . "'\">\r\n");
			foreach ($cols as $c) {
			   fwrite($this->table_template_file,"<th #column id=\"" . $c['Field'] . "\">" . $c['Label'] . "</th>\r\n");
			}
			fwrite($this->table_template_file, "<button #column class=\"btn btn-primary\"><i class=\"bi bi-clipboard-data\"></i></button>\r\n");
			fwrite($this->table_template_file, "</sql-table>");
		}

		function create_dashboard($sql) {

			fwrite($this->dashboard_ts_file,"import { Component, OnInit } from '@angular/core';\r\n");
			fwrite($this->dashboard_ts_file,"import { CommonModule } from '@angular/common';\r\n");
			fwrite($this->dashboard_ts_file,"import { ActivatedRoute, Router, RouterModule } from '@angular/router';\r\n");
			fwrite($this->dashboard_ts_file,"import { SqlComponentsModule, } from 'sql-components';\r\n");
			fwrite($this->dashboard_ts_file,"\r\n");
			fwrite($this->dashboard_ts_file,"			@Component({\r\n");
			fwrite($this->dashboard_ts_file,"			selector: '" . $this->dashboard_selector . "',\r\n");
			fwrite($this->dashboard_ts_file,"			standalone: true,\r\n");
			fwrite($this->dashboard_ts_file,"			imports: [CommonModule, SqlComponentsModule],\r\n");
			fwrite($this->dashboard_ts_file,"			templateUrl: './" . $this->dashboard_directory . ".component.html',\r\n");
			fwrite($this->dashboard_ts_file,"			styleUrls: ['./" . $this->dashboard_directory . "']\r\n");
			fwrite($this->dashboard_ts_file,"			})\r\n");
			fwrite($this->dashboard_ts_file,"           \r\n");
			fwrite($this->dashboard_ts_file,"			export class " . $this->dashboard_class_name . " implements OnInit {\r\n");
			fwrite($this->dashboard_ts_file,"           \r\n");
			fwrite($this->dashboard_ts_file,"				data: any;\r\n");
			fwrite($this->dashboard_ts_file,"				id: any = '';\r\n");
			fwrite($this->dashboard_ts_file,"				id2: any = '';\r\n");
			fwrite($this->dashboard_ts_file,"				id3: any = '';\r\n");
			fwrite($this->dashboard_ts_file,"\r\n");
			fwrite($this->dashboard_ts_file,"				constructor(\r\n");
			fwrite($this->dashboard_ts_file,"				private _activatedRoute: ActivatedRoute,\r\n");
			fwrite($this->dashboard_ts_file,"				private _sqlDataService: SQLDataService,\r\n");
			fwrite($this->dashboard_ts_file,"				private _router: Router\r\n");
			fwrite($this->dashboard_ts_file,"			) { }\r\n");
			fwrite($this->dashboard_ts_file,"\r\n");
			fwrite($this->dashboard_ts_file,"			ngOnInit(): void {\r\n");
			fwrite($this->dashboard_ts_file,"					this._activatedRoute.data.subscribe(({ \r\n");
			fwrite($this->dashboard_ts_file,"					parameters })=> { \r\n");
			fwrite($this->dashboard_ts_file,"						this.id = parameters.id;\r\n");
			fwrite($this->dashboard_ts_file,"						this.id2 = parameters.id2;\r\n");
			fwrite($this->dashboard_ts_file,"						this.id3 = parameters.id3;\r\n");
			fwrite($this->dashboard_ts_file,"\r\n");
			fwrite($this->dashboard_ts_file,"						let params = { page: '', id: parameters.id, id2: parameters.id2, id3: parameters.id3 }\r\n");
			fwrite($this->dashboard_ts_file,"						this._sqlDataService.paramSubject.next(params);\r\n");
			fwrite($this->dashboard_ts_file,"					})   \r\n");
			fwrite($this->dashboard_ts_file,"				setTimeout(() => {\r\n");
			fwrite($this->dashboard_ts_file,"					this._sqlDataService.pageSubject.subscribe((data: any) => {\r\n");
			fwrite($this->dashboard_ts_file,"					this.data=data;\r\n");
			fwrite($this->dashboard_ts_file,"				})\r\n");
			fwrite($this->dashboard_ts_file,"				}, 150);\r\n");
			fwrite($this->dashboard_ts_file,"			}\r\n");
			fwrite($this->dashboard_ts_file,"\r\n");
			fwrite($this->dashboard_ts_file,"			}\r\n");
			fwrite($this->dashboard_ts_file,"\r\n");
			fclose($this->dashboard_ts_file);

			fwrite($this->dashboard_template_file,"<sql-panel [use_router] = \"'Y'\"\r\n"); 
			fwrite($this->dashboard_template_file,"     [sql] = \"'" . $sql . "'\"\r\n");
			fwrite($this->dashboard_template_file,"     [card] = \"'Y'\" [class] = \"''\" [style] = \"''\"\r\n");
			fwrite($this->dashboard_template_file,"     [title] = \"''\">\r\n");
			fwrite($this->dashboard_template_file,"     <div header>\r\n");
			fwrite($this->dashboard_template_file,"        {{ title }}\r\n");
			fwrite($this->dashboard_template_file,"     </div>\r\n");
			fwrite($this->dashboard_template_file,"\r\n");
			fwrite($this->dashboard_template_file,"     <div footer>");
			fwrite($this->dashboard_template_file,"\r\n");
			fwrite($this->dashboard_template_file,"     	<div class=\"row\">\r\n");
			fwrite($this->dashboard_template_file,"           	<div class=\"col-12\">\r\n");
			fwrite($this->dashboard_template_file,"           		<!-- Banner Row -->\r\n");
			fwrite($this->dashboard_template_file,"			     </div>\r\n");			
			fwrite($this->dashboard_template_file,"			</div>\r\n");
			fwrite($this->dashboard_template_file,"\r\n");
			fwrite($this->dashboard_template_file,"         <!-- content row -->\r\n");
			fwrite($this->dashboard_template_file,"     	<div class=\"row\">\r\n");
			fwrite($this->dashboard_template_file,"        	      <!-- Left Column -->\r\n");
			fwrite($this->dashboard_template_file,"         	  <div class=\"col-sm-12 col-lg-6 col-xl-4\">\r\n");
			fwrite($this->dashboard_template_file,"      	      </div>\r\n");
			fwrite($this->dashboard_template_file,"           	  <div class=\"col-sm-12 col-lg-6 col-xl-4\">\r\n");
			fwrite($this->dashboard_template_file,"           		<!-- Center Column -->\r\n");
			fwrite($this->dashboard_template_file,"      	      </div>\r\n");
			fwrite($this->dashboard_template_file,"               <div class=\"col-sm-12 col-lg-6 col-xl-4\">\r\n");
			fwrite($this->dashboard_template_file,"           		<!-- Right Column -->\r\n");
			fwrite($this->dashboard_template_file,"      	      </div>\r\n");
			fwrite($this->dashboard_template_file,"     </div>\r\n");
			fwrite($this->dashboard_template_file,"  </div>\r\n");
			fwrite($this->dashboard_template_file,"</sql-panel>\r\n");
		}

		function create_add_table() {

			fwrite($this->table_ts_file, "import { Component, Input, Output, EventEmitter } from '@angular/core';\r\n");
			fwrite($this->table_ts_file, "import { CommonModule } from '@angular/common';\r\n");
			fwrite($this->table_ts_file, "import { SqlComponentsModule } from 'sql-components';\r\n");
			fwrite($this->table_ts_file, "import { " . $this->form_class_name . " } from '..\\" . $this->form_directory . "\\" . $this->form_directory . "-component';\r\n");
			fwrite($this->table_ts_file, "\r\n");
			fwrite($this->table_ts_file, "\r\n");
			fwrite($this->table_ts_file, "@Component({\r\n");
			fwrite($this->table_ts_file, "  selector: '" . $this->table_selector . "',\r\n");
			fwrite($this->table_ts_file, "  standalone: true,\r\n");
			fwrite($this->table_ts_file, "  imports: [CommonModule, SqlComponentsModule], \r\n");
			fwrite($this->table_ts_file, "  templateUrl: './" . $this->table_directory . ".component.html',\r\n");
			fwrite($this->table_ts_file, "  styleUrls: ['./" . $this->table_directory . ".component.css']\r\n");
			fwrite($this->table_ts_file, "})\r\n");
			fwrite($this->table_ts_file, "export class " . $this->table_class_name . " {\r\n");
			fwrite($this->table_ts_file, " \r\n");
			fwrite($this->table_ts_file, "  @Output() button_click: EventEmitter<any> = new EventEmitter<any>();\r\n");
			fwrite($this->table_ts_file, "  @Output() row_click: EventEmitter<any> = new EventEmitter<any>();\r\n");
			fwrite($this->table_ts_file, "\r\n");
			fwrite($this->table_ts_file, "\r\n");
			fwrite($this->table_ts_file, "processButton(m: any) {\r\n");
			fwrite($this->table_ts_file, " this.button_click.emit(m);\r\n");
			fwrite($this->table_ts_file, "}\r\n");
			fwrite($this->table_ts_file, "\r\n");
			fwrite($this->table_ts_file, "processRow(m: any) {\r\n");
			fwrite($this->table_ts_file, " this.row_click.emit(m);\r\n");
			fwrite($this->table_ts_file, "}\r\n");
			fwrite($this->table_ts_file, "\r\n");
			fwrite($this->table_ts_file, "}\r\n");
			fclose($this->table_ts_file);

			fwrite($this->table_template_file, "<sql-add-table [title]=\"'" . $this->base_table . "'\" [sql]=\"'select * from " . $this->table_name . "'\">\r\n");
			foreach ($this->cols as $c) {
			   fwrite($this->table_template_file,"    <th #column id=\"" . $c['Field'] . "\">" . $c['Label'] . "</th>\r\n");
			}
			fwrite($this->table_template_file, "      <div form>\r\n");
			fwrite($this->table_template_file, "            <" . $this->form_selector . "></" . $this->form_selector . ">\r\n");
			fwrite($this->table_template_file, "      </div>\r\n");
			fwrite($this->table_template_file, "</sql-add-table>");
		}

		function make_crud_set($name) {
			
			$this->table_name = $name;
			$tmp=str_replace("psp_","",$this->table_name);
			$this->base_table = str_replace('_','-',$tmp);
			$this->get_cols($this->table_name);

			$this->form_selector="app-" . $this->base_table . "-form";
			$this->table_selector="app-" . $this->base_table . "-table";
			$this->panel_selector="app-" . $this->base_table . "-panel";
			$this->dashboard_selector="app-" . $this->base_table . "-dashboard";

			$this->form_directory=$this->base_table . '-form';
			try {
				mkdir($this->base_dir . "/" . $this->form_directory);
    		}  catch(Exception $e) { }

            $this->form_ts_file=fopen($this->base_dir . "/" . $this->form_directory . "/" . $this->form_directory . ".component.ts","w");
            $this->form_template_file=fopen($this->base_dir . "/" . $this->form_directory . "/" . $this->form_directory . ".component.html","w");
            $this->form_css_file=fopen($this->base_dir . "/" . $this->form_directory . "/" . $this->form_directory . ".component.css","w");

			array_push($this->post['files'],$this->form_directory . "/" . $this->form_directory . ".component.ts");
			array_push($this->post['files'],$this->form_directory . "/" . $this->form_directory . ".component.html");
			array_push($this->post['files'],$this->form_directory . "/" . $this->form_directory . ".component.css");

			$this->table_directory=$this->base_table . '-table';
			try {
				mkdir($this->base_dir . "/" . $this->table_directory);
    		}  catch(Exception $e) { }

            $this->table_ts_file=fopen($this->base_dir . "/" . $this->table_directory . "/" . $this->table_directory . ".component.ts","w");
            $this->table_template_file=fopen($this->base_dir . "/" . $this->table_directory . "/" . $this->table_directory . ".component.html","w");
            $this->table_css_file=fopen($this->base_dir . "/" . $this->table_directory . "/" . $this->table_directory . ".component.css","w");

			array_push($this->post['files'],$this->table_directory . "/" . $this->table_directory . ".component.ts","w");
			array_push($this->post['files'],$this->table_directory . "/" . $this->table_directory . ".component.html","w");
			array_push($this->post['files'],$this->table_directory . "/" . $this->table_directory . ".component.css","w");

			$this->panel_directory=$this->base_table . '-panel';
			$this->dashboard_directory=$this->base_table . '-dashboard';

			$this->form_class_name=$this->derive_class_name($this->base_table,"Form");
			$this->table_class_name=$this->derive_class_name($this->base_table,"Table");
			$this->panel_class_name=$this->derive_class_name($this->base_table,"Panel");
			$this->dashboard_class_name=$this->derive_class_name($this->base_table,"Dashboard");

			$this->create_form();
			$this->create_add_table();
			$this->send_zip();
		}

		function make_form_set($name) {
			$this->table_name = $name;
			$tmp=str_replace("psp_","",$this->table_name);
			$this->base_table = str_replace('_','-',$tmp);
			$this->get_cols($this->table_name);

			$this->form_selector="app-" . $this->base_table . "-form";
			$this->table_selector="app-" . $this->base_table . "-table";
			$this->panel_selector="app-" . $this->base_table . "-panel";
			$this->dashboard_selector="app-" . $this->base_table . "-dashboard";

			$this->form_directory=$this->base_table . '-form';
			try {
				mkdir($this->base_dir . "/" . $this->form_directory);
    		}  catch(Exception $e) { }

            $this->form_ts_file=fopen($this->base_dir . "/" . $this->form_directory . "/" . $this->form_directory . ".component.ts","w");
            $this->form_template_file=fopen($this->base_dir . "/" . $this->form_directory . "/" . $this->form_directory . ".component.html","w");
            $this->form_css_file=fopen($this->base_dir . "/" . $this->form_directory . "/" . $this->form_directory . ".component.css","w");

			array_push($this->post['files'],$this->form_directory . "/" . $this->form_directory . ".component.ts");
			array_push($this->post['files'],$this->form_directory . "/" . $this->form_directory . ".component.html");
			array_push($this->post['files'],$this->form_directory . "/" . $this->form_directory . ".component.css");

			$this->panel_directory=$this->base_table . '-panel';
			$this->dashboard_directory=$this->base_table . '-dashboard';

			$this->form_class_name=$this->derive_class_name($this->base_table,"Form");

			$this->create_form();
			$this->send_zip();
		}

		function derive_info_panel_name($name) {
			$this->table_name = $name;
			$tmp=str_replace("psp_","",$this->table_name);
			$this->base_table = str_replace('_','-',$tmp);
			$this->get_cols($this->table_name);			
		}
	
		function derive_base_table_name($name) {
			$this->table_name = $name;
			$tmp=str_replace("psp_","",$this->table_name);
			$this->base_table = str_replace('_','-',$tmp);
			return $this->base_table;
		}

		function derive_selector_name($base_table,$suffix) {
			return "app-" . $base_name . "-" . $suffix;
		}

		function build_dashboard_set($name) {
			
			$this->table_name = $name;
			$tmp=str_replace("psp_","",$this->table_name);
			$this->base_table = str_replace('_','-',$tmp);
			$this->get_cols($this->table_name);

			$this->form_selector="app-" . $this->base_table . "-form";
			$this->table_selector="app-" . $this->base_table . "-table";
			$this->panel_selector="app-" . $this->base_table . "-panel";
			$this->dashboard_selector="app-" . $this->base_table . "-dashboard";

			$this->form_directory=$this->base_table . '-form';
			try {
				mkdir($this->base_dir . "/" . $this->form_directory);
    		}  catch(Exception $e) { }

            $this->form_ts_file=fopen($this->base_dir . "/" . $this->form_directory . "/" . $this->form_directory . ".component.ts","w");
            $this->form_template_file=fopen($this->base_dir . "/" . $this->form_directory . "/" . $this->form_directory . ".component.html","w");
            $this->form_css_file=fopen($this->base_dir . "/" . $this->form_directory . "/" . $this->form_directory . ".component.css","w");

			array_push($this->post['files'],$this->form_directory . "/" . $this->form_directory . ".component.ts");
			array_push($this->post['files'],$this->form_directory . "/" . $this->form_directory . ".component.html");
			array_push($this->post['files'],$this->form_directory . "/" . $this->form_directory . ".component.css");

			$this->table_directory=$this->base_table . '-list';
			try {
				mkdir($this->base_dir . "/" . $this->table_directory);
    		}  catch(Exception $e) { }

            $this->table_ts_file=fopen($this->base_dir . "/" . $this->table_directory . "/" . $this->table_directory . ".component.ts","w");
            $this->table_template_file=fopen($this->base_dir . "/" . $this->table_directory . "/" . $this->table_directory . ".component.html","w");
            $this->table_css_file=fopen($this->base_dir . "/" . $this->table_directory . "/" . $this->table_directory . ".component.css","w");

			array_push($this->post['files'],$this->table_directory . "/" . $this->table_directory . ".component.ts","w");
			array_push($this->post['files'],$this->table_directory . "/" . $this->table_directory . ".component.html","w");
			array_push($this->post['files'],$this->table_directory . "/" . $this->table_directory . ".component.css","w");

			$this->panel_directory=$this->base_table . '-panel';
			try {
				mkdir($this->base_dir . "/" . $this->panel_directory);
    		}   catch(Exception $e) { }

			array_push($this->post['files'],$this->panel_directory . "/" . $this->panel_directory . ".component.ts","w");
			array_push($this->post['files'],$this->panel_directory . "/" . $this->panel_directory . ".component.html","w");
			array_push($this->post['files'],$this->panel_directory . "/" . $this->panel_directory . ".component.css","w");

			$this->dashboard_directory=$this->base_table . '-dashboard';
			try {
				mkdir($this->base_dir . "/" . $this->dashboard_directory);
    		}   catch(Exception $e) { }

			$this->dashboard_ts_file=fopen($this->base_dir . "/" . $this->dashboard_directory . "/" . $this->dashboard_directory . ".component.ts","w");
            $this->dashboard_template_file=fopen($this->base_dir . "/" . $this->dashboard_directory . "/" . $this->dashboard_directory . ".component.html","w");
            $this->dashboard_css_file=fopen($this->base_dir . "/" . $this->dashboard_directory . "/" . $this->dashboard_directory . ".component.css","w");

			array_push($this->post['files'],$this->dashboard_directory . "/" . $this->dashboard_directory . ".component.ts","w");
			array_push($this->post['files'],$this->dashboard_directory . "/" . $this->dashboard_directory . ".component.html","w");
			array_push($this->post['files'],$this->dashboard_directory . "/" . $this->dashboard_directory . ".component.css","w");

			$this->form_class_name=$this->derive_class_name($this->base_table,"Form");
			$this->table_class_name=$this->derive_class_name($this->base_table,"List");
			$this->panel_class_name=$this->derive_class_name($this->base_table,"Panel");
			$this->dashboard_class_name=$this->derive_class_name($this->base_table,"Dashboard");

			$this->create_form();		
			$sql="select * from " . $this->table_name . " order by id desc";											
			$this->create_list($sql, $this->cols);
			$sql="select * from " . $this->table_name . " where id = :id"; 
			$this->create_dashboard($sql);
			$this->send_zip();

		}

		function build_info_set($table) {

		}


}

$table=$_POST['table_name'];
$sql=$_POST['sql'];
$package=$_POST['package'];

$A=new SQLLabsAI();

if ($package=="crud-set") {
	$A->make_crud_set($table);
}

if ($package=="dashboard-set") {

//	$this->create_form=$_POST['fk'];
    $child_tables=$_POST['child_tables'];
	$A->child_table_array=explode(",",$child_tables);
	$child_panels=$_POST['child_panels'];
	$A->child_panel_array=explode(",",$child_panels);
	$A->build_dashboard_set($table);

}
if ($package=="info-panel") {
	$A->build_info_set($table);
}

if ($package=="form") {
	$A->make_form_set($table);
}


if ($package=="info-panel") {
	$A->build_children_sets($table);
}

?>