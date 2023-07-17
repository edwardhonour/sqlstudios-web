import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SqlComponentsModule, SQLDataService } from 'sql-components';

			@Component({
			selector: 'app-doc-workspace-dashboard',
			standalone: true,
			imports: [CommonModule, SqlComponentsModule],
			templateUrl: './doc-workspace-dashboard.component.html',
			styleUrls: ['./doc-workspace-dashboard.component.css']
			})
           
			export class DocWorkspaceDashboardComponent implements OnInit {
           
				data: any;
				id: any = '';
				id2: any = '';
				id3: any = '';
				
				constructor(
				private _activatedRoute: ActivatedRoute,
				private _sqlDataService: SQLDataService,
				private _router: Router
			) { }

			ngOnInit(): void {
					this._activatedRoute.data.subscribe(({ 
					parameters })=> { 
						this.id = parameters.id;
						this.id2 = parameters.id2;
						this.id3 = parameters.id3;

						let params = { page: '', id: parameters.id, id2: parameters.id2, id3: parameters.id3 }
						this._sqlDataService.paramSubject.next(params);
					})   
				setTimeout(() => {
					this._sqlDataService.pageSubject.subscribe((data: any) => {
					this.data=data;
				})
				}, 150);
			}

			}

